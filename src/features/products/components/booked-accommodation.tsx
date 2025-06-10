import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Avatar, Typography } from 'antd'
import { useCookies } from 'react-cookie'

import { colors } from '@/config/theme'
import RangePicker from '@/components/rangepicker'

import RadioIcon from '@/components/icons/radio'
import CoinsIcon from '@/components/icons/coins'
import PieChartIcon from '@/components/icons/pie-chart'

const verticalLine = {
  id: 'corsair',
  afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
    // eslint-disable-next-line no-underscore-dangle
    if (chart.tooltip._active && chart.tooltip._active.length) {
      // find coordinates of tooltip
      const activePoint = chart.tooltip._active[0]
      const { ctx } = chart
      const { x } = activePoint.element
      const topY = chart.scales.y.top
      const bottomY = chart.scales.y.bottom

      // draw vertical line
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#E5E7EB'
      ctx.stroke()
      ctx.restore()
    }
  },
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  verticalLine,
)

const labels = [
  '19 янв',
  '20 янв',
  '21 янв',
  '22 янв',
  '23 янв',
  '24 янв',
  '25 янв',
  '26 янв',
  '27 янв',
  '28 янв',
  '29 янв',
  '30 янв',
]

const data = {
  labels,
  datasets: [
    {
      label: 'blue',
      data: [5, 50, 52, 60, 30, 60, 65, 60, 25, 30, 40, 30],
      borderColor: colors.primary,
      fill: true,
      backgroundColor: function (context: any) {
        const chart = context.chart
        const { ctx, chartArea } = chart
        if (!chartArea) return

        let gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top,
        )
        gradient.addColorStop(0.9, `${colors.primary}66`)
        gradient.addColorStop(0.4, `${colors.primary}2F`)
        gradient.addColorStop(0, '#5A9EF500')
        return gradient
      },
      lineTension: 0.5,
      borderWidth: 2,
      pointRadius: 0,
    },
    {
      label: 'green',
      data: [10, 23, 31, 34, 42, 100, 21, 64, 75, 21, 31, 75],
      borderColor: colors.success,
      fill: true,
      backgroundColor: function (context: any) {
        const chart = context.chart
        const { ctx, chartArea } = chart
        if (!chartArea) return

        let gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top,
        )
        gradient.addColorStop(0.9, `${colors.success}66`)
        gradient.addColorStop(0.4, `${colors.success}2F`)
        gradient.addColorStop(0, '#5A9EF500')
        return gradient
      },
      lineTension: 0.5,
      borderWidth: 2,
      pointRadius: 0,
    },
  ],
}

const BookedAccommodation = () => {
  const [cookies] = useCookies(['darkTheme'])

  const options = {
    responsive: true,
    tension: 0.3,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0,
      },
    },

    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: cookies.darkTheme
          ? colors.secondary_dark
          : colors.primary_dark,
        multiKeyBackground: 'rgba(0, 0, 0, 0)',
        cornerRadius: 4,
        caretSize: 8,
        callbacks: {
          labelColor: (context: any) => {
            return {
              borderColor: 'rgba(0,0,0,0)',
              backgroundColor: context.dataset.borderColor,
              borderWidth: 3,
              borderRadius: 6,
            }
          },

          label: (context: any) => {
            let label = ''
            if (context.parsed.y) {
              if (context.dataset.label === 'blue') {
                label = context.parsed.y + ' бронирования'
              } else {
                label = context.parsed.y + ' занято'
              }
            }
            return ' ' + label
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          // drawBorder: false,
          lineWidth: 0,
        },
        ticks: { padding: 16, color: '#9CA3AF' },
        border: { display: false },
      },
      y: {
        grid: {
          color: cookies.darkTheme ? colors.secondary_dark : '#E5E7EB',
        },
        ticks: { stepSize: 20, padding: 16, color: '#9CA3AF' },
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        border: { display: false },
      },
    },
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-[32px]">
          <div className="flex flex-col">
            <RangePicker singlePlaceholder="Выберите период" />
          </div>
          <div className="flex items-center gap-4 font-medium">
            <RadioIcon className="text-primary text-[24px]" />
            Забронировано
          </div>
          <div className="flex items-center gap-4 font-medium">
            <RadioIcon className="text-success text-[24px]" />
            Занято
          </div>
        </div>
        <div className="flex items-center gap-[48px]">
          <div className="flex items-center gap-4">
            <Avatar
              size={45}
              shape="square"
              icon={<PieChartIcon className="text-[24px]" />}
              className="dark:bg-white/5 bg-[#F8FAFC] dark:text-white rounded-lg text-primary-dark"
            />
            <div className="flex flex-col">
              <Typography.Text className="text-[14px] font-normal dark:text-secondary">
                Загруженность
              </Typography.Text>
              <Typography.Text className="text-[18px] font-medium">
                74%
              </Typography.Text>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar
              size={45}
              shape="square"
              icon={<CoinsIcon className="text-[24px]" />}
              className="dark:bg-white/5 bg-[#F8FAFC] dark:text-white rounded-lg text-primary-dark"
            />
            <div className="flex flex-col">
              <Typography.Text className="text-[14px] font-normal dark:text-secondary">
                Доход
              </Typography.Text>
              <Typography.Text className="text-[18px] font-medium">
                182 590 000 UZS
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[268px] w-full">
        <Line options={options} data={data} width={'100%'} />
      </div>
    </div>
  )
}

export default BookedAccommodation
