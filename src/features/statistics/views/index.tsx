import { Typography } from 'antd'

import logo from '../../../assets/jinxing.jpg'
import { getStatistics } from '../api'
import { useQuery } from '@tanstack/react-query'
import { formatAmount } from '@/helpers/format-amount'

export default function StatisticsPage(): React.ReactElement {
  const { data, refetch } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => getStatistics(),
  })

  console.log(data)

  return (
    <div className="container h-full py-6 pb-[80px]">
      <div className="pt-8">
        <div className="fixed w-full top-0 py-4 flex items-center gap-2 bg-white">
          <img src={logo} className="w-[28px] h-[28px]" />
          <Typography.Text className="text-[28px] font-semibold">
            Jinxing Uz{' '}
            <span className="bg-[#fdbb31] px-2 rounded-xl">Admin</span>
          </Typography.Text>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 shadow-xl rounded-[16px] col-span-2">
            <span className="text-[18px] font-semibold">
              Umumiy daromad (USD)
            </span>
            <div className="text-[24px] font-bold">{data?.orders_amount}</div>
          </div>
          <div className="bg-white p-4 shadow-xl rounded-[16px] ">
            <span className="text-[16px] font-semibold">Daromaddan foyda</span>
            <div className="text-[24px] font-bold text-green-500">
              {formatAmount(data?.net_profit)} UZS
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl rounded-[16px]">
            <span className="text-[16px] font-semibold">
              Mahsulotning tan narxi
            </span>
            <div className="text-[24px] font-bold">
              {formatAmount(data?.orders_amount_approved)} UZS
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl rounded-[16px] flex flex-col justify-between">
            <span className="text-[16px] font-semibold">Mahsulot turi</span>
            <div className="text-[24px] font-bold">
              {data?.product_type_count} ta
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl rounded-[16px]">
            <span className="text-[16px] font-semibold">
              Umumiy mahsulot soni
            </span>
            <div className="text-[24px] font-bold">
              {data?.product_count} ta
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl rounded-[16px]">
            <span className="text-[16px] font-semibold">
              Foydalanuvchilar soni
            </span>
            <div className="text-[24px] font-bold">{data?.user_count} ta</div>
          </div>
          <div className="col-span-2 bg-white p-4 shadow-xl rounded-[16px] flex flex-col justify-between">
            <span className="text-[16px] font-semibold">
              Kutilayotgan umumiy daromad
            </span>
            <div className="text-[24px] font-bold">
              {formatAmount(data?.product_total_amount)} USD
            </div>
          </div>
          <div className="col-span-1 bg-white p-4 shadow-xl rounded-[16px] flex flex-col justify-between">
            <span className="text-[16px] font-semibold">
              Kutilayotgan sof foyda
            </span>
            <div className="text-[24px] font-bold">
              {formatAmount(data?.product_total_net_profit)} USD
            </div>
          </div>
          <div className="col-span-1 bg-white p-4 shadow-xl rounded-[16px] flex flex-col justify-between">
            <span className="text-[16px] font-semibold">
              Kutilayotgan tannarx
            </span>
            <div className="text-[24px] font-bold">
              {formatAmount(data?.product_total_amount_approved)} USD
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Typography.Text>Buyurtmalar holati</Typography.Text>
          <div className="bg-white p-4 shadow-xl rounded-[16px] mt-2">
            <div className="text-[14px] font-semibold flex items-center gap-1">
              <span className="w-[12px] h-[12px] bg-green-500 rounded-full inline-block" />
              Tasdiqlangan buyurtmalar (dona)
            </div>
            <div className="text-[18px] font-bold">
              {data?.orders_count_approved} ta
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl rounded-[16px] mt-2">
            <div className="text-[14px] font-semibold flex items-center gap-1">
              <span className="w-[12px] h-[12px] bg-yellow-500 rounded-full inline-block" />
              Jarayondagi buyurtmalar (dona)
            </div>
            <div className="text-[18px] font-bold">
              {data?.orders_count_in_process} ta
            </div>
          </div>
          <div className="bg-white p-4 shadow-xl rounded-[16px] mt-2">
            <div className="text-[14px] font-semibold flex items-center gap-1">
              <span className="w-[12px] h-[12px] bg-red-500 rounded-full inline-block" />
              Bekor qilngan buyurtmalar (dona)
            </div>
            <div className="text-[18px] font-bold">
              {data?.orders_count_canceled} ta
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
