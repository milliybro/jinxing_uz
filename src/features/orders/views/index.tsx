import { useMutation, useQuery } from '@tanstack/react-query'
import { getHistory, updateOrders } from '../api'
import { Button, Collapse, Divider, Modal, Typography } from 'antd'
import { formatPrice } from '@/features/welcome/helpers/formatPrice'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export default function OrdersPage(): React.ReactElement {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1]
        const payloadJson = atob(
          payloadBase64.replace(/-/g, '+').replace(/_/g, '/'),
        )
        const payload = JSON.parse(payloadJson)
        setUserId(payload.id)
      } catch (error) {
        console.error('Token decode qilishda xatolik:', error)
      }
    }
  }, [])

  const { data, refetch } = useQuery({
    queryKey: ['history', userId],
    queryFn: () => getHistory({ user: userId }),
    enabled: !!userId,
  })

  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ id, data }: any) => updateOrders(id, data),
    onSuccess: (data, variables) => {
      refetch()
      // Modal.success({
      //   title: 'Muvaffaqiyatli',
      //   content: `Buyurtma ${
      //     variables?.data?.status === 'bekor qilindi'
      //       ? 'bekor qilindi'
      //       : 'tasdiqlandi'
      //   }`,
      // })
    },

    onError: () => {},
  })

  return (
    <div className="container h-full py-6 relative pb-[80px]">
      <div className="h-full flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold pt-4">
            Buyurtmalar({data?.count})
          </h1>

          {/* <p className="mt-4 text-gray-500">Buyurtmalar yo'q</p> */}
          {data?.results
            .slice()
            .reverse()
            .map((order, i) => {
              const handleCancel = () => {
                updateMutate({
                  id: order?.id,
                  data: { status: 'bekor qilindi' },
                })
              }

              const handleConfirm = () => {
                updateMutate({ id: order?.id, data: { status: 'tasdiqlandi' } })
              }

              return (
                <div key={i} className="border rounded-[8px] mt-4 ">
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
                        {dayjs(order?.created_at).format(
                          'dddd, DD MMMM YYYY HH:MM',
                        )}
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

                    {order?.status === 'jarayonda' && (
                      <div className="flex justify-center items-center gap-3 px-2 pt-3">
                        <Button
                          className="bg-danger text-white outline-danger border-danger"
                          onClick={handleCancel}
                        >
                          Bekor qilish
                        </Button>
                        <Button onClick={handleConfirm}>Qabul qilish</Button>
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
                            {order?.order_items.map((item: any, i: number) => {
                              return (
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
                              )
                            })}
                          </div>
                        ),
                      },
                    ]}
                    onChange={onChange}
                    expandIconPosition="end"
                    className="p-0"
                    size="small"
                  />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
