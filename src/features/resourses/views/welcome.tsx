import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Button,
  Drawer,
  Dropdown,
  Form,
  Image,
  Input,
  Menu,
  message,
  Modal,
  Typography,
  Upload,
} from 'antd'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../api'
import React, { useState } from 'react'
import CloseIcon from '@/components/icons/close'
import { MoreOutlined, UploadOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Welcome(): React.ReactElement {
  const [form] = Form.useForm()
  const [file, setFile] = React.useState(null)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const location = useLocation()
  const isProductPage = location.pathname.includes('product')

  const { data, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
    setSelectedCategory(null)
    form.resetFields()
    setFile(null)
  }

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      message.success('Katalog muvaffaqiyatli yaratildi!')
      form.resetFields()
      setFile(null)
      onClose()
      refetch()
    },
    onError: (err) => {
      message.error(err)
    },
  })
  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, data }: any) => updateCategory(id, data),
    onSuccess: () => {
      message.success('Katalog muvaffaqiyatli yangilandi!')
      form.resetFields()
      setFile(null)
      setSelectedCategory(null)
      onClose()
      refetch()
    },
    onError: () => {
      message.error('Tahrirlashda xatolik yuz berdi.')
    },
  })

  const onFinish = (values: any) => {
    const formData = new FormData()
    formData.append('name', values.name)

    if (file) {
      formData.append('image', file)
    }

    if (selectedCategory) {
      updateMutate({ id: selectedCategory.id, data: formData })
    } else {
      mutate(formData)
    }
  }

  const beforeUpload = (file: any) => {
    setFile(file)
    return false
  }
  const onEdit = (category: any) => {
    setSelectedCategory(category)
    form.setFieldsValue({
      name: category.name,
    })
    setFile(null)
    setOpen(true)
  }

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      message.success('Katalog muvaffaqiyatli o‘chirildi!')
      refetch()
    },
    onError: () => {
      message.error('O‘chirishda xatolik yuz berdi.')
    },
  })
  const onDelete = (category: any) => {
    Modal.confirm({
      title: 'Katalogni o‘chirish',
      content: `"${category.name}" katalogini o‘chirishni istaysizmi?`,
      okText: 'Ha, o‘chiraman',
      cancelText: 'Bekor qilish',
      okType: 'danger',
      onOk() {
        deleteMutate(category.id)
      },
    })
  }

  const navigate = useNavigate()

  const goToCategoryProducts = (category: any) => {
    navigate(
      `/resourses/product?id=${category.id}&name=${encodeURIComponent(
        category.name,
      )}`,
    )
  }

  return (
    <div className="pb-[70px]">
      {!isProductPage && (
        <div className="container h-full py-6 ">
          <div className="">
            <div className="flex justify-between items-center">
              <Typography.Text className="text-[28px] font-semibold">
                Kataloglar
              </Typography.Text>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true)
                }}
              >
                Katalog qo'shish
              </Button>
            </div>

            {data ? (
              <div className="grid grid-cols-2 gap-5 mt-3">
                {data?.results.map((category, index: number) => {
                  const menu = (
                    <Menu>
                      <Menu.Item
                        className="text-[20px]"
                        key="edit"
                        onClick={() => onEdit(category)}
                      >
                        Tahrirlash
                      </Menu.Item>
                      <Menu.Item
                        className="text-[20px]"
                        key="delete"
                        danger
                        onClick={() => onDelete(category)}
                      >
                        O‘chirish
                      </Menu.Item>
                    </Menu>
                  )
                  return (
                    <div
                      key={index}
                      className="bg-zinc-300/70 text-gray-900 rounded-xl shadow-lg h-full overflow-hidden p-1 relative"
                    >
                      <Image
                        preview={false}
                        src={category.image}
                        height={150}
                        alt="Category 1"
                        className="m-0 p-0 rounded-t-xl"
                        onClick={() => goToCategoryProducts(category)}
                      />
                      <Dropdown overlay={menu} trigger={['click']}>
                        <span className="absolute right-2 top-2 bg-[#fcfcfc] w-8 h-8 flex justify-center items-center rounded-full cursor-pointer shadow">
                          <MoreOutlined className="text-[20px]" />
                        </span>
                      </Dropdown>
                      <div
                        onClick={() => goToCategoryProducts(category)}
                        className="px-4 h-10 flex items-center justify-center"
                      >
                        <p className="text-center font-semibold">
                          {category?.name}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full -mt-20 text-[20px]">
                Kataloglar mavjud emas
              </div>
            )}
          </div>
          <Drawer
            placement="bottom"
            closable={false}
            open={open}
            height="100vh"
            className="p-0 mt-4 rounded-t-3xl bg-[#fcfcfc]"
            bodyStyle={{ padding: 0, backgroundColor: '#fafafa' }}
            zIndex={100}
          >
            <div className="overflow-y-visible pb-[200px]">
              <button
                onClick={onClose}
                className="absolute top-8 right-3 z-50 bg-white rounded-full px-2 py-1 text-xl shadow"
              >
                <CloseIcon />
              </button>
              <div className="py-5 px-3">
                <Typography.Text>Katalog qo'shish</Typography.Text>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="Katalog nomi:"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Iltimos, katalog nomini kiriting',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Masalan: Elektronika" />
                  </Form.Item>

                  <Form.Item
                    label="Katalog rasmi:"
                    name="image"
                    rules={[
                      { required: true, message: 'Iltimos, rasm yuklang' },
                    ]}
                  >
                    <Upload
                      beforeUpload={beforeUpload}
                      showUploadList={{ showRemoveIcon: true }}
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>Rasmni tanlang</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item className="mt-3">
                    <Button type="primary" htmlType="submit">
                      Saqlash
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Drawer>
          <Outlet />
        </div>
      )}
      <Outlet />
    </div>
  )
}
