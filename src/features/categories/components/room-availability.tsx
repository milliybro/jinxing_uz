import { Avatar, Tooltip, Typography } from 'antd'

import RangePicker from '@/components/rangepicker'

import CoinsIcon from '@/components/icons/coins'
import PieChartIcon from '@/components/icons/pie-chart'

const RoomAvailability = () => {
  const bodyData = [
    {
      name: 'Alisher',
      room: 'DAFA xonasi',
      items: [{}, {}, { name: 'Children' }, {}, {}, {}, {}],
    },
    { name: '312312', room: 'DAFA xonasi', items: [] },
    { name: 'Alisher1', room: 'DAFA xonasi', items: [{ name: 'Children' }] },
    { name: 'Alisher2', room: 'DAFA xonasi', items: [{ name: 'Children' }] },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <RangePicker singlePlaceholder="Выберите период" />

        <div className="flex items-center gap-[48px]">
          <div className="flex items-center gap-4">
            <Avatar
              size={45}
              shape="square"
              icon={<PieChartIcon className="text-[24px]" />}
              className="bg-[#F8FAFC] dark:bg-white/5 dark:text-white rounded-lg text-primary-dark"
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
              className="bg-[#F8FAFC] rounded-lg dark:bg-white/5 dark:text-white text-primary-dark"
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
      <div className="overflow-auto w-full h-full max-h-[550px]">
        <table className="w-full border-separate border-spacing-0 calendar-table">
          <thead className="bg-white sticky top-0 z-[5]">
            <tr className="text-xs text-secondary">
              <th
                className="w-[163px] border-t border-l bg-white dark:bg-primary-dark dark:border-secondary-dark font-medium sticky left-0 z-[5]"
                rowSpan={3}
              >
                Доступные номера
              </th>
            </tr>

            <tr>
              <th className="h-[40px] text-secondary dark:bg-primary-dark dark:border-secondary-dark border-t max-w-[90px]">
                <div className="flex flex-col gap-3 items-center">
                  <span className="text-sm font-medium">19 янв, Чт</span>
                  <span className="text-sm text-white font-medium bg-secondary py-[2px] px-1">
                    240 номеров
                  </span>
                </div>
              </th>
              <th className="h-[40px] text-secondary dark:bg-primary-dark dark:border-secondary-dark border-t max-w-[90px]">
                <div className="flex flex-col gap-3 items-center">
                  <span className="text-sm font-medium">20 янв, Пт</span>
                  <span className="text-sm text-white font-medium bg-secondary py-[2px] px-1">
                    240 номеров
                  </span>
                </div>
              </th>
              <th className="h-[40px] text-secondary dark:bg-primary-dark dark:border-secondary-dark border-t max-w-[90px]">
                <div className="flex flex-col gap-3 items-center">
                  <span className="text-sm font-medium">21 янв, Сб</span>
                  <span className="text-sm text-white font-medium bg-secondary py-[2px] px-1">
                    240 номеров
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {bodyData?.map((_, i) => (
              <tr key={`tr-${i}`}>
                <th className="sticky left-0 z-[4] w-[400px] bg-white dark:bg-primary-dark dark:border-secondary-dark border-l text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">DBL</span>
                    <span className="text-sm text-secondary font-normal">
                      Двухместный номер с одной двуспальной кроватью.
                    </span>
                  </div>
                </th>
                <Tooltip
                  placement="right"
                  trigger="click"
                  overlayClassName="[&_.ant-tooltip-inner]:bg-primary-dark [&_.ant-tooltip-inner]:rounded-[4px] [&_.ant-tooltip-inner]:shadow-none [&_.ant-tooltip-arrow:before]:bg-primary-dark"
                  title={
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">25 января</div>
                      <div className="text-xs font-medium text-[#D1D5DB]">
                        30 свободных номеров
                      </div>
                    </div>
                  }
                >
                  <td
                    className={`bg-white dark:bg-primary-dark dark:border-secondary-dark text-xs p-6 focus:shadow-[inset_0_0_0_1px_#2563EB]`}
                    tabIndex={0}
                  >
                    80
                  </td>
                </Tooltip>
                <td className="bg-white dark:bg-primary-dark dark:border-secondary-dark text-xs p-6">
                  81
                </td>
                <td className="bg-white dark:bg-primary-dark dark:border-secondary-dark text-xs p-6">
                  82
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RoomAvailability
