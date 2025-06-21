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
  Select,
  Typography,
  Upload,
} from 'antd'
import {
  createProduct,
  deleteProduct,
  getCategories,
  updateProduct,
} from '../api'
import React, { useState } from 'react'
import CloseIcon from '@/components/icons/close'
import { MoreOutlined, UploadOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProducts } from '@/features/products/api'
import { formatPrice } from '@/features/welcome/helpers/formatPrice'
import CheckIcon from '@/components/icons/check'

export default function Product(): React.ReactElement {
  const [form] = Form.useForm()
  const [file, setFile] = React.useState(null)

  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const navigate = useNavigate()

  const { data, refetch } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProducts({ category: id }),
    enabled: !!id,
  })

  const productsOptions = data?.results || []
  const [open, setOpen] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  const onClose = () => {
    setOpen(false)
    setSelectedCategory(null)
    form.resetFields()
    setFile(null)
  }
  const onCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success('Mahsulot muvaffaqiyatli yaratildi!')
      form.resetFields()
      setFile(null)
      onClose()
      refetch()
    },
    onError: () => {
      message.error('Xatolik yuz berdi.')
    },
  })
  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, data }: any) => updateProduct(id, data),
    onSuccess: () => {
      message.success('mahsulot muvaffaqiyatli yangilandi!')
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
    formData.append('category_id', values.category_id)
    formData.append('name', values.name)
    formData.append('price', values.price)
    formData.append('sku', values.sku)
    formData.append('description', values.description)
    formData.append('count', values.count)
    if (file) {
      formData.append('image', file)
    }
    if (selectedCategory) {
      updateMutate({ id: selectedCategory.id, data: formData })
    } else {
      mutate(formData)
    }
    // mutate(formData)
  }

  const beforeUpload = (file: any) => {
    setFile(file)
    return false
  }

  const onEdit = (product: any) => {
    setSelectedCategory(product)
    form.setFieldsValue({
      name: product.name,
      category: product?.category?.id,
      price: product?.price,
      sku: product?.sku,
      description: product?.description,
      count: product?.count,
    })
    setFile(null)
    setOpen(true)
  }

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      message.success('Mahsulot muvaffaqiyatli o‘chirildi!')
      refetch()
    },
    onError: () => {
      message.error('O‘chirishda xatolik yuz berdi.')
    },
  })
  const onDelete = (category: any) => {
    Modal.confirm({
      title: 'Mahsulotni o‘chirish',
      content: `"${category.name}" mahsulotini o‘chirishni istaysizmi?`,
      okText: 'Ha, o‘chiraman',
      cancelText: 'Bekor qilish',
      okType: 'danger',
      onOk() {
        deleteMutate(category.id)
      },
    })
  }
  const onProductClick = (product: any) => {
    setSelectedProduct(product)
    setOpenDrawer(true)
  }

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  const categoryOptions = categoryData?.results || []
  return (
    <div className="container h-full py-6 ">
      <div className="">
        <div
          className="text-[16px] font-[500] border w-fit py-1 px-2 rounded-[8px] cursor-pointer "
          onClick={() => navigate(-1)}
        >
          ← Orqaga
        </div>
        <div className="flex justify-between items-center">
          <Typography.Text className="text-[28px] font-semibold">
            Mahsulotlar
          </Typography.Text>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true)
            }}
          >
            Mahsulot qo'shish
          </Button>
        </div>
        <div>{name}</div>

        {data ? (
          <div className="grid grid-cols-2 gap-5 mt-3">
            {data?.results.map((product, index: number) => {
              const menu = (
                <Menu>
                  <Menu.Item
                    className="text-[20px]"
                    key="edit"
                    onClick={() => onEdit(product)}
                  >
                    Tahrirlash
                  </Menu.Item>
                  <Menu.Item
                    className="text-[20px]"
                    key="delete"
                    danger
                    onClick={() => onDelete(product)}
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
                    src={product.image}
                    height={150}
                    alt="product 1"
                    className="m-0 p-0 rounded-t-xl"
                    onClick={() => onProductClick(product)}
                  />
                  <Dropdown overlay={menu} trigger={['click']}>
                    <span className="absolute right-2 top-2 bg-[#fcfcfc] w-8 h-8 flex justify-center items-center rounded-full cursor-pointer shadow">
                      <MoreOutlined className="text-[20px]" />
                    </span>
                  </Dropdown>
                  <div
                    className="px-4 h-10 flex items-center justify-center"
                    onClick={() => onProductClick(product)}
                  >
                    <p className="text-center font-semibold">{product?.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full -mt-20 text-[20px]">
            Mahsulot mavjud emas
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
            <Typography.Text>Mahsulot qo'shish</Typography.Text>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Kategoriya:"
                name="category_id"
                rules={[
                  { required: true, message: 'Iltimos, kategoriya tanlang' },
                ]}
              >
                <Select placeholder="Kategoriyani tanlang" size="large">
                  {categoryOptions.map((cat) => (
                    <Select.Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Mahsulot nomi:"
                name="name"
                rules={[
                  { required: true, message: 'Iltimos, nomini kiriting' },
                ]}
              >
                <Input size="large" placeholder="Masalan: Kompressor" />
              </Form.Item>

              <Form.Item
                label="Narxi (so'm):"
                name="price"
                rules={[{ required: true, message: 'Narxini kiriting' }]}
              >
                <Input
                  type="number"
                  size="large"
                  placeholder="Masalan: 250000"
                />
              </Form.Item>

              <Form.Item
                label="SKU (maxsus kod):"
                name="sku"
                rules={[{ required: true, message: 'SKU kodini kiriting' }]}
              >
                <Input size="large" placeholder="Masalan: ABC-1234" />
              </Form.Item>

              <Form.Item
                label="Tavsif:"
                name="description"
                rules={[{ required: true, message: 'Tavsif kiriting' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Mahsulot haqida qisqacha ma’lumot"
                />
              </Form.Item>

              <Form.Item
                label="Soni:"
                name="count"
                rules={[{ required: true, message: 'Soni kiritilishi kerak' }]}
              >
                <Input type="number" size="large" placeholder="Masalan: 10" />
              </Form.Item>

              <Form.Item
                label="Mahsulot rasmi:"
                name="image"
                rules={[{ required: true, message: 'Rasm yuklang' }]}
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
      <Drawer
        placement="bottom"
        closable={false}
        open={openDrawer}
        height="100vh"
        className="p-0 mt-4 rounded-t-3xl bg-[#fcfcfc]"
        bodyStyle={{ padding: 0, backgroundColor: '#fafafa' }}
        zIndex={100}
      >
        <div className="overflow-y-visible pb-[200px]">
          <button
            onClick={onCloseDrawer}
            className="absolute top-8 right-3 z-50 bg-white rounded-full px-2 py-1 text-xl shadow"
          >
            <CloseIcon />
          </button>

          {selectedProduct && (
            <>
              <Image
                src={selectedProduct.image}
                height={400}
                alt={selectedProduct.name}
              />
              <div className="px-4 py-2">
                <h4 className="text-[#FDBB31]">
                  {selectedProduct?.category?.name}
                </h4>
                <h3 className="text-lg font-semibold mb-2">
                  {selectedProduct.name}
                </h3>
                <h2 className="font-bold text-[28px]">
                  {formatPrice(selectedProduct?.price)}{' '}
                </h2>
                <p className="text-[14px]">
                  <span className="font-semibold">Mahsulot ta'rifi: </span>
                  {selectedProduct.description}
                </p>
                <h2 className="text-[16px]">
                  <span className="font-semibold">SKU:</span>{' '}
                  {selectedProduct?.sku}{' '}
                </h2>
                <p className="text-green-500 ">
                  <CheckIcon /> {selectedProduct?.count} dona xarid qilish
                  mumkin
                </p>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  )
}
