import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_4882_4074)">
      <path
        d="M10.8333 8.5L5.5 8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8.16667"
        cy="8.50016"
        r="6.66667"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </g>
    <defs>
      <clipPath id="clip0_4882_4074">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0.166504 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default function MinusSignCircleIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
