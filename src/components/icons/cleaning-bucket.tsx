import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 9.5H20.4948C20.9907 9.5 21.2387 9.5 21.3843 9.66028C21.5299 9.82055 21.5108 10.0726 21.4728 10.5767L20.8518 18.8068C20.7196 20.5588 20.6535 21.4349 20.0893 21.9674C19.5252 22.5 18.6633 22.5 16.9396 22.5H12.4354C10.7116 22.5 9.84972 22.5 9.28559 21.9674C8.44616 21.175 8.58069 19.5693 8.5 18.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 9.40909V14.8636C11.5 16.5778 11.5 17.4349 10.9142 17.9675C10.3284 18.5 9.38562 18.5 7.5 18.5C5.61438 18.5 4.67157 18.5 4.08579 17.9675C3.5 17.4349 3.5 16.5778 3.5 14.8636V13.9545C3.5 11.3832 3.5 10.0976 4.37868 9.2988C5.25736 8.5 6.67157 8.5 9.5 8.5H10.5C10.9714 8.5 11.2071 8.5 11.3536 8.63313C11.5 8.76627 11.5 8.98054 11.5 9.40909Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 9.5C19.5 5.63401 17.25 2.5 14.4746 2.5C11.9428 2.5 9.84836 5.10771 9.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 14.5H11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 13.5H20.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CleaningBucketIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
