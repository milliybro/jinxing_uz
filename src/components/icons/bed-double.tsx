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
    <g clipPath="url(#clip0_4708_50861)">
      <path
        d="M14.9167 12.1665L1.58337 12.1665"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9167 14.5L14.9167 11.1667C14.9167 9.90959 14.9167 9.28105 14.5262 8.89052C14.1357 8.5 13.5071 8.5 12.25 8.5L4.25004 8.5C2.99296 8.5 2.36442 8.5 1.9739 8.89052C1.58337 9.28105 1.58337 9.90959 1.58337 11.1667L1.58337 14.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.58333 8.5V7.3089C7.58333 7.05515 7.54519 6.97027 7.34983 6.87025C6.94297 6.66194 6.4491 6.5 5.91667 6.5C5.38423 6.5 4.89037 6.66194 4.4835 6.87025C4.28814 6.97027 4.25 7.05515 4.25 7.3089L4.25 8.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M12.2501 8.5V7.3089C12.2501 7.05515 12.2119 6.97027 12.0166 6.87025C11.6097 6.66194 11.1159 6.5 10.5834 6.5C10.051 6.5 9.55711 6.66194 9.15025 6.87025C8.95489 6.97027 8.91675 7.05515 8.91675 7.3089L8.91675 8.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M14.25 8.5L14.25 5.40705C14.25 4.94595 14.25 4.7154 14.1219 4.49768C13.9938 4.27996 13.8113 4.16727 13.4463 3.94189C11.9746 3.03319 10.1829 2.5 8.25 2.5C6.31711 2.5 4.52543 3.03319 3.05372 3.94189C2.68869 4.16727 2.50618 4.27996 2.37809 4.49768C2.25 4.7154 2.25 4.94595 2.25 5.40705L2.25 8.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4708_50861">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0.25 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default function BedDoubleIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
