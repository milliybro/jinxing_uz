import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 27 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.20801 13C3.20801 8.14847 3.20801 5.7227 4.71519 4.21552C6.22237 2.70834 8.64814 2.70834 13.4997 2.70834C18.3512 2.70834 20.777 2.70834 22.2842 4.21552C23.7913 5.7227 23.7913 8.14847 23.7913 13C23.7913 17.8515 23.7913 20.2773 22.2842 21.7845C20.777 23.2917 18.3512 23.2917 13.4997 23.2917C8.64814 23.2917 6.22237 23.2917 4.71519 21.7845C3.20801 20.2773 3.20801 17.8515 3.20801 13Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8.625 18.4167C11.151 15.771 15.8218 15.6464 18.375 18.4167M16.203 10.2917C16.203 11.7874 14.9887 13 13.4908 13C11.9929 13 10.7786 11.7874 10.7786 10.2917C10.7786 8.79591 11.9929 7.58334 13.4908 7.58334C14.9887 7.58334 16.203 8.79591 16.203 10.2917Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export default function UserSquareIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
