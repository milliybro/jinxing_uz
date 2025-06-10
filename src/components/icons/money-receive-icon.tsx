import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.334 6C19.6341 6.1287 20.5092 6.41956 21.1624 7.07691C22.334 8.25596 22.334 10.1536 22.334 13.9489C22.334 17.7442 22.334 19.6419 21.1624 20.8209C19.9908 22 18.1052 22 14.334 22H10.334C6.56275 22 4.67713 22 3.50556 20.8209C2.33398 19.6419 2.33398 17.7442 2.33398 13.9489C2.33398 10.1536 2.33398 8.25596 3.50556 7.07691C4.15874 6.41956 5.03387 6.1287 6.33398 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.83398 5.5C10.3255 6.0057 11.6338 8 12.334 8M14.834 5.5C14.3425 6.0057 13.0342 8 12.334 8M12.334 8V2"
      stroke="#1F2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8418 14H18.8328"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.8418 14H5.83281"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.834 14C14.834 15.3807 13.7147 16.5 12.334 16.5C10.9533 16.5 9.83398 15.3807 9.83398 14C9.83398 12.6193 10.9533 11.5 12.334 11.5C13.7147 11.5 14.834 12.6193 14.834 14Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

export default function MoneyReceiveIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
