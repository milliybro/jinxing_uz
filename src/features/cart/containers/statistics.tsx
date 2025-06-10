import StatisticsCard from '../components/statistics-card'

import LoginIcon from '@/components/icons/login'
import LogoutIcon from '@/components/icons/logout'
import PieChartIcon from '@/components/icons/pie-chart'
import BedDoubleIcon from '@/components/icons/bed-double'

const Statistics = ({ items }:any) => {
  const item = [
    {
      title: 'were-check-ins',
      value: items?.arrival,
      out_of: items?.will_arrive,
      icon: LoginIcon,
    },
    {
      title: 'were-check-outs',
      value: items?.departure,
      icon: LogoutIcon,
    },
    {
      title: 'currently-staying-guests',
      value: items?.residence,
      icon: BedDoubleIcon,
    },
    {
      title: 'daily-hotel-occupancy',
      value: items?.booked,
      unit: '%',
      icon: PieChartIcon,
    },
  ]
  return (
    <div className="grid grid-cols-4 gap-6">
      {item?.map((val, i) => (
        <StatisticsCard key={'statistics-card-' + i} {...val} />
      ))}
    </div>
  )
}

export default Statistics
