import CheckIcon from '@/components/icons/check'
import CloseIcon from '@/components/icons/close'
import { formatPrice } from '@/features/welcome/helpers/formatPrice'
import { useCartStore } from '@/store/cart-store'
import { useQuery } from '@tanstack/react-query'
import { Collapse, Drawer, Image, Input, Pagination, Table } from 'antd'
import { useState } from 'react'
import { getUser } from '../api'
import { PhoneFilled } from '@ant-design/icons'

export default function UsersPage(): React.ReactElement {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const cart = useCartStore((state) => state.cart)
  const addToCart = useCartStore((state) => state.addToCart)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)

  const itemInCart = selectedProduct
    ? cart.find((item) => item.id === selectedProduct.id)
    : null

  const count = itemInCart?.count || 0
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isFetching } = useQuery({
    queryKey: ['users', currentPage],
    queryFn: () => getUser({ params: { page: currentPage, page_size: 20 } }),
  })
  console.log(data)

  const onClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const onProductClick = (product: any) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  const columns = [
    {
      title: 'Ismi',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Telefon raqami',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Buyurtmalar',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Summa',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
  ]
  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  return (
    <div className="container h-full py-6 overflow-hidden pb-[70px]">
      <div className="">
        <h1 className="text-2xl font-bold pt-4">Foydalanuvchilar</h1>
        <div className="overflow-scroll bg-white mt-2">
          <Collapse
            items={
              data?.results
                ? data?.results.map((item: any, index: number) => ({
                    key: String(index),
                    label: (
                      <div className="font-medium text-[14px] flex justify-between">
                        <h4>{item?.first_name || 'Nomaʼlum mahsulot'}</h4>
                        {item?.phone_number}
                      </div>
                    ),
                    children: (
                      <div className="flex text-gray-900 rounded-xl p-1 mt-1">
                        <div className="w-full flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between">
                              <p className="text-start font-semibold text-[12px] mb-1">
                                Ismi:
                              </p>
                              <p className="text-start font-semibold text-[12px] mb-1">
                                {item?.first_name}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-start font-semibold text-[12px] mb-1">
                                Buyurtmalar soni:
                              </p>
                              <p className="text-start font-semibold text-[12px] mb-1">
                                {item?.orders_count}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-start font-semibold text-[12px] mb-1">
                                Umumiy harid:
                              </p>
                              <p className="text-start font-semibold text-[12px] mb-1">
                                {formatPrice(item?.orders_amount)}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-start font-semibold text-[12px] mb-1">
                                Telefon raqami:
                              </p>
                              <p className="text-start font-semibold text-[12px] mb-1">
                                {item?.phone_number}
                              </p>
                            </div>
                            <div className="flex justify-center my-2">
                              <a
                                className="bg-[#fdbb31] py-2 px-1 rounded-[8px] text-white"
                                href={`tel:${item?.phone_number}`}
                              >
                                Qo'ng'iroq qilish{' '}
                                <PhoneFilled className="text-[16px]" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  }))
                : []
            }
            onChange={onChange}
            expandIconPosition="end"
            className="p-0"
            size="small"
          />
        </div>
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
                  {formatPrice(selectedProduct?.price)}
                </h2>
                <p className="text-[14px]">
                  <span className="font-semibold">Mahsulot ta'rifi: </span>
                  {selectedProduct.description}
                </p>
                <h2 className="text-[16px]">
                  <span className="font-semibold">SKU:</span>{' '}
                  {selectedProduct?.sku}
                </h2>
                <p className="text-green-500">
                  <CheckIcon /> {selectedProduct?.count} dona xarid qilish
                  mumkin
                </p>

                <div className="mt-6">
                  {count === 0 ? (
                    <button
                      onClick={() =>
                        addToCart(
                          {
                            id: selectedProduct.id,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                            image: selectedProduct.image,
                            maxCount: selectedProduct.count,
                          },
                          1,
                        )
                      }
                      className="w-full bg-white border-black border rounded-[12px] px-4 py-[14px] text-[16px] font-medium"
                    >
                      Qo‘shish
                    </button>
                  ) : (
                    <div className="w-full flex justify-between items-center rounded-[12px] mt-2 bg-white px-4 py-2 border border-black">
                      <button
                        onClick={() => decrement(selectedProduct.id)}
                        className="text-[24px] font-bold text-black"
                      >
                        –
                      </button>
                      <span className="text-[16px] font-medium">{count}</span>
                      <button
                        onClick={() => increment(selectedProduct.id)}
                        className="text-[24px] font-bold text-black"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Drawer>
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={10}
          total={data?.count || 0}
          onChange={(page) => {
            setCurrentPage(page)
            console.log(page)
          }}
          showSizeChanger={false}
        />
      </div>

      {isFetching && (
        <div className="text-center py-4 font-semibold text-gray-500">
          Yuklanmoqda...
        </div>
      )}
    </div>
  )
}
