import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.1216 3.14417C14.611 2.65478 14.8557 2.41009 15.1268 2.29307C15.5173 2.12448 15.9601 2.12448 16.3507 2.29307C16.6217 2.41009 16.8664 2.65478 17.3558 3.14417C17.8452 3.63356 18.0899 3.87825 18.2069 4.14934C18.3755 4.53988 18.3755 4.98266 18.2069 5.3732C18.0899 5.64429 17.8452 5.88898 17.3558 6.37837L13.1712 10.563C12.1402 11.594 11.6247 12.1095 10.979 12.415C10.3333 12.7204 9.60783 12.792 8.15686 12.9351L7.5 13L7.56482 12.3431C7.70798 10.8921 7.77958 10.1666 8.08501 9.52096C8.39042 8.8753 8.90592 8.35982 9.93692 7.32883L14.1216 3.14417Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M5.00008 13H3.12508C2.31966 13 1.66675 13.6529 1.66675 14.4583C1.66675 15.2638 2.31966 15.9167 3.12508 15.9167H11.0417C11.8472 15.9167 12.5001 16.5696 12.5001 17.375C12.5001 18.1804 11.8472 18.8333 11.0417 18.8333H9.16675"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function EditIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
