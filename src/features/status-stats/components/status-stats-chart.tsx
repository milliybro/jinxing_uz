import React from 'react'
import { Typography } from 'antd'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

const StatusStatsChart = () => {
  const { t } = useTranslation()
  const series = [55, 45, 20]
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    colors: ['#22C55E', '#EAB308', '#EF4444'],
    labels: ['Реализовано', 'Незаезд', 'Отменено'],
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // Hide legend to avoid displaying default labels
    },
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="rounded-3xl mb-[50px] border bg-white dark:border-secondary-dark dark:bg-primary-dark">
        <div className="flex items-center p-6 gap-4">
          <Text className="text-lg font-medium leading-[30.6px]">
            {t('chart.booking-status')}
          </Text>
        </div>
        <hr />
        <div className="grid grid-cols-4">
          <div className="col-span-3 relative h-[450px] w-full p-6">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={400}
            />
          </div>
          <div className="flex flex-col gap-6 p-6 border-l">
            <h2 className="text-[#232E40] dark:text-[#fcfcfc] text-4xl font-semibold">
              6 305 {t('common.bookings')}
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-sm" />
                  <p className="text-[#9CA3AF] text-sm font-base">
                    {t('common.implemented')}
                  </p>
                </div>
                <div className="text-sm font-medium text-[#1F2937]">3 290</div>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#EAB308] rounded-sm" />
                  <p className="text-[#9CA3AF] text-sm font-base">
                    {t('common.no-show')}
                  </p>
                </div>
                <div className="text-sm font-medium text-[#1F2937]">1 850</div>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#EF4444] rounded-sm" />
                  <p className="text-[#9CA3AF] text-sm font-base">
                    {t('common.canceled')}
                  </p>
                </div>
                <div className="text-sm font-medium text-[#1F2937]">1 304</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusStatsChart
