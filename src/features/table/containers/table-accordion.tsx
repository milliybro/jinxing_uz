import { Collapse } from 'antd'
import { CollapseProps } from 'antd'

import TariffClosure from '../components/tariff-closure'
import ArrowDownIcon from '@/components/icons/arrow-down'
import AccordionPrice from '../components/accordion-price'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Цены',
    children: <AccordionPrice />,
  },
  {
    key: '2',
    label: 'Закрытие тарифа',
    children: <TariffClosure />,
  },
  {
    key: '3',
    label: 'Закрытие заезда',
    children: <p>{text}</p>,
    collapsible: 'disabled',
  },
  {
    key: '4',
    label: 'Минимальный срок проживания',
    children: <p>{text}</p>,
  },
  {
    key: '5',
    label: 'Минимальное окно бронирования',
    children: <p>{text}</p>,
  },
]

const TableAccordion = () => {
  return (
    <Collapse
      accordion
      items={items}
      expandIconPosition="end"
      expandIcon={(i) => (
        <ArrowDownIcon
          className={`text-[20px] text-secondary duration-200 ${
            i.isActive ? '-rotate-180' : ''
          }`}
        />
      )}
    />
  )
}

export default TableAccordion
