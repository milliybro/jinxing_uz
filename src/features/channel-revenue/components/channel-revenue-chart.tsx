import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Typography } from 'antd'
import { ApexOptions } from 'apexcharts'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

const ChannelRevenueChart = () => {
  const { t } = useTranslation()
  const data = useMemo(
    () => [
      {
        value: 35,
        color: '#2563EB',
        label: t('common.reception'),
      },
      {
        value: 15,
        color: '#EF4444',
        label: 'EasyBooking',
      },
      {
        value: 80,
        color: '#EAB308',
        label: 'Booking.com',
      },
      {
        value: 80,
        color: '#14B8A6',
        label: 'AirBnb.ru',
      },
    ],
    [],
  )

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
    colors: data.map((item) => item.color),
    labels: data.map((item) => item.label),
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
      },
    },
    legend: {
      show: false, // Hide legend if you don't want to display it
    },
    dataLabels: {
      enabled: false, // Disable data labels if you don't want them
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}`,
      },
    },
  }

  const series = data.map((item) => item.value)

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="rounded-3xl mb-[50px] border bg-white dark:border-secondary-dark dark:bg-primary-dark">
        <div className="flex items-center p-6 gap-4">
          <Text className="text-lg font-medium leading-[30.6px]">
            {t('chart.source-revenue')}
          </Text>
        </div>
        <hr />
        <div className="grid grid-cols-2">
          <div className="relative h-[350px] w-full p-6">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={350}
            />
          </div>
          <div className="flex flex-col gap-6 p-6">
            <h2 className="text-[#232E40] dark:text-[#fcfcfc] text-4xl font-semibold">
              283 980 000 UZS
            </h2>
            <div className="flex flex-col gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-[#9CA3AF] text-sm font-base">
                      {item.label}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-[#1F2937]">
                    {item.value.toLocaleString()}{' '}
                    {/* Format number with commas */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl mb-[50px] border bg-white dark:border-secondary-dark dark:bg-primary-dark">
        <div className="flex items-center p-6 gap-4">
          <Text className="text-lg font-medium leading-[30.6px]">
            {t('chart.nights-sold')}
          </Text>
        </div>
        <hr />
        <div className="grid grid-cols-2">
          <div className="relative h-[350px] w-full p-6">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={350}
            />
          </div>
          <div className="flex flex-col gap-6 p-6">
            <h2 className="text-[#232E40] dark:text-[#fcfcfc] text-4xl font-semibold">
              6 305 {t('common.nights')}
            </h2>
            <div className="flex flex-col gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-[#9CA3AF] text-sm font-base">
                      {item.label}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-[#1F2937]">
                    {item.value.toLocaleString()}{' '}
                    {/* Format number with commas */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelRevenueChart
