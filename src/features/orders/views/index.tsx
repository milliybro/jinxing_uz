import { useQuery, useMutation } from '@tanstack/react-query'
import { getHistory, updateOrders } from '../api'
import { Button, Collapse, Divider, Typography, Pagination } from 'antd'
import { formatPrice } from '@/features/welcome/helpers/formatPrice'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function OrdersPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isFetching } = useQuery({
    queryKey: ['history', currentPage],
    queryFn: () => getHistory({ pageParam: currentPage }),
    keepPreviousData: true,
  })

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: ({ id, data }: any) => updateOrders(id, data),
    onSuccess: () => {},
    onError: () => {},
  })

  return (
    <div className="container h-full py-6 relative pb-[80px]">
      <h1 className="text-2xl font-bold pt-4">Buyurtmalar</h1>

      {data?.results.map((order) => {
        const handleCancel = () => {
          updateMutate({ id: order?.id, data: { status: 'bekor qilindi' } })
        }

        const handleConfirm = () => {
          updateMutate({ id: order?.id, data: { status: 'tasdiqlandi' } })
        }

        return (
          <div key={order?.id} className="border rounded-[8px] mt-4">
            <h3 className="py-2 px-2 font-semibold text-[16px]">
              Buyurtma ID raqami{' '}
              <span className="text-[#fdbb31]">{order?.id}</span>
            </h3>
            <Divider className="m-1" />
            <div className="flex flex-col gap-[2px] mb-2">
              <div className="flex justify-between items-center px-2">
                <Typography.Text className="text-[14px] font-semibold">
                  Holat:
                </Typography.Text>
                <Typography.Text
                  className={`text-[14px] font-[500] ${
                    order?.status === 'jarayonda'
                      ? 'text-yellow-500'
                      : order?.status === 'tasdiqlandi'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {order?.status}
                </Typography.Text>
              </div>

              <div className="flex justify-between items-start px-2">
                <Typography.Text className="text-[14px] font-semibold">
                  Buyurtma sanasi:
                </Typography.Text>
                <Typography.Text className="text-[14px] font-[500] text-end w-[150px]">
                  {dayjs(order?.created_at).format('dddd, DD MMMM YYYY HH:mm')}
                </Typography.Text>
              </div>

              <div className="flex justify-between items-center px-2">
                <Typography.Text className="text-[14px] font-semibold">
                  Buyurtma qiymati:
                </Typography.Text>
                <Typography.Text className="text-[14px] font-[500] text-end">
                  {formatPrice(order?.total_price)}
                </Typography.Text>
              </div>

              <div className="flex justify-between items-start px-2">
                <Typography.Text className="text-[14px] font-semibold">
                  Mijoz haqida:
                </Typography.Text>
                <Typography.Text className="text-[14px] font-[500] text-end w-[150px]">
                  {order?.user?.first_name} {order?.user?.phone_number}
                </Typography.Text>
              </div>

              {order?.status === 'jarayonda' && (
                <div className="flex justify-center items-center gap-3 px-2 pt-3">
                  <Button
                    className="bg-danger text-white outline-danger border-danger"
                    onClick={handleCancel}
                    loading={isLoading}
                  >
                    Bekor qilish
                  </Button>
                  <Button onClick={handleConfirm} loading={isLoading}>
                    Qabul qilish
                  </Button>
                </div>
              )}
            </div>

            <Collapse
              items={[
                {
                  key: '1',
                  label: <h4>{order?.order_items?.length} mahsulot</h4>,
                  children: (
                    <div>
                      {order?.order_items.map((item: any, i: number) => (
                        <div
                          key={i}
                          className="flex text-gray-900 rounded-xl p-1 mt-1"
                        >
                          <img
                            src={item?.product?.image}
                            alt={item?.product?.name}
                            className="m-0 p-0 rounded-xl object-fit w-[90px] h-[90px]"
                          />
                          <div className="w-full flex flex-col justify-between px-4 py-1">
                            <div>
                              <div className="flex justify-between">
                                <p className="text-start font-semibold text-[12px] mb-1">
                                  Nomi:
                                </p>
                                <p className="text-start font-semibold text-[12px] mb-1">
                                  {item?.product?.name}
                                </p>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-start font-semibold text-[12px] mb-1">
                                  Soni:
                                </p>
                                <p className="text-start font-semibold text-[12px] mb-1">
                                  {item?.quantity}
                                </p>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-start font-semibold text-[12px] mb-1">
                                  Narxi:
                                </p>
                                <p className="text-start font-semibold text-[12px] mb-1">
                                  {formatPrice(item?.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
              expandIconPosition="end"
              className="p-0"
              size="small"
            />
          </div>
        )
      })}

      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={20}
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
