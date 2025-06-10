import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4 6.83301C10.4 7.93758 9.50459 8.83301 8.40002 8.83301C7.29545 8.83301 6.40002 7.93758 6.40002 6.83301C6.40002 5.72844 7.29545 4.83301 8.40002 4.83301C9.50459 4.83301 10.4 5.72844 10.4 6.83301Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M8.40002 1.83301C11.1059 1.83301 13.4 4.11836 13.4 6.89094C13.4 9.70768 11.0685 11.6843 8.91502 13.0285C8.75808 13.1188 8.58061 13.1663 8.40002 13.1663C8.21944 13.1663 8.04197 13.1188 7.88502 13.0285C5.73552 11.6712 3.40002 9.71741 3.40002 6.89094C3.40002 4.11836 5.69416 1.83301 8.40002 1.83301Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M12.4 13.833C12.4 14.5694 10.6092 15.1663 8.40002 15.1663C6.19089 15.1663 4.40002 14.5694 4.40002 13.833"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
)

export default function LocationIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
