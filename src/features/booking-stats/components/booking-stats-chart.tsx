import Slider from '@/components/slider'
import { Tabs, TabsProps, Typography } from 'antd'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

const { Text } = Typography

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BookingsStatsChart = () => {
  const [value, setValue] = useState<number>(2940)
  const [valueSum, setValueSum] = useState<number>(1583980000)
  const { t } = useTranslation()

  const max = 3760
  const maxSum = 1840094760

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('common.sale'),
      children: (
        <div className="h-full flex flex-col justify-between ">
          <div>
            <Slider max={max} value={value} bg="#D946EF" />
            <p className="text-[#777E90] text-sm font-medium pt-4">{t('')}</p>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: t('common.price'),
      children: (
        <div className="h-full flex flex-col justify-between ">
          <div>
            <Slider max={maxSum} value={valueSum} bg="#10B981" />
            <p className="text-[#777E90] text-sm font-medium pt-4">
              {t('booking-stats-page.chart.title')}
            </p>
          </div>
        </div>
      ),
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  const data: ChartData<'bar'> = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const month = dayjs().month(i).format('MMM')
      return month[0].toUpperCase() + month.slice(1)
    }),
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55],
        backgroundColor: '#D946EF',
        barThickness: 10, // Set the thickness of each bar to 10px
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90, 48, 40, 19, 86, 27, 90],
        backgroundColor: '#10B981',
        barThickness: 10, // Set the thickness of each bar to 10px
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart takes the full height of its container
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  }

  return (
    <div className="rounded-3xl mb-[50px] border bg-white dark:border-secondary-dark dark:bg-primary-dark">
      <div className="flex items-center p-6 gap-4">
        <Text className="text-lg font-medium leading-[30.6px]">
          {t('booking-stats-page.chart.title')}
        </Text>
      </div>
      <hr />
      <div className="grid grid-cols-6">
        <div className="col-span-5 p-6 h-[350px] w-full">
          <div className="h-full w-full">
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="col-span-1 border-l p-6 flex flex-col justify-between">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          <div className="flex flex-col justify-end">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D946EF] rounded-sm" />{' '}
              <p className="text-[#9CA3AF] text-sm font-base">
                {t('chart.nights-sold')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#10B981] rounded-sm" />{' '}
              <p className="text-[#9CA3AF] text-sm font-base">
                {t('booking-stats-page.chart.avg-room')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingsStatsChart
