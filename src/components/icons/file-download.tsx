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
      d="M10.4166 2.16602H10.6439C13.3615 2.16602 14.7204 2.16602 15.664 2.83088C15.9345 3.02137 16.1745 3.24728 16.3769 3.50176C17.0833 4.38991 17.0833 5.66882 17.0833 8.22662V10.3478C17.0833 12.8172 17.0833 14.0518 16.6925 15.0378C16.0643 16.6232 14.7357 17.8736 13.0513 18.4648C12.0036 18.8327 10.6918 18.8327 8.06814 18.8327C6.56892 18.8327 5.81931 18.8327 5.22061 18.6225C4.25812 18.2847 3.49892 17.5701 3.13993 16.6643C2.91663 16.1008 2.91663 15.3953 2.91663 13.9842V10.4993"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.0833 10.5C17.0833 12.0341 15.8397 13.2777 14.3056 13.2777C13.7508 13.2777 13.0967 13.1806 12.5572 13.3251C12.0779 13.4535 11.7035 13.8279 11.5751 14.3072C11.4306 14.8467 11.5277 15.5008 11.5277 16.0556C11.5277 17.5897 10.2841 18.8333 8.75 18.8333"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 6.74935C4.15961 7.17077 5.24981 8.83268 5.83333 8.83268M5.83333 8.83268C6.41686 8.83268 7.50706 7.17077 7.91667 6.74935M5.83333 8.83268V2.16602"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function FileDownloadIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
