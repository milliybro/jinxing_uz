import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="70"
    height="52"
    viewBox="0 0 70 52"
    fill="none"
  >
    <path
      d="M6.05172 8.74695L17.2131 6.88672V40.7392L12.3018 41.7731C9.01306 42.4655 5.79705 40.3218 5.17081 37.0198L1.14319 15.7833C0.515988 12.4762 2.73148 9.30032 6.05172 8.74695Z"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <path
      d="M63.9483 8.74695L52.7869 6.88672V40.7392L57.6982 41.7731C60.9869 42.4655 64.203 40.3218 64.8292 37.0198L68.8568 15.7833C69.484 12.4762 67.2685 9.30032 63.9483 8.74695Z"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <g filter="url(#filter0_dd_7084_82053)">
      <rect
        x="17.0664"
        y="1"
        width="35.8689"
        height="42.7541"
        rx="5"
        stroke="#635BFF"
        strokeWidth="2"
        shapeRendering="crispEdges"
      />
    </g>
    <path
      d="M47.9353 43.7546H22.0664C19.305 43.7546 17.0664 41.516 17.0664 38.7546L17.0664 35.2935L29.4732 22.1457L38.9834 33.0896C39.7841 34.011 41.2162 34.0064 42.011 33.0799L47.2464 26.977L52.9353 33.0984V38.7546C52.9353 41.516 50.6967 43.7546 47.9353 43.7546Z"
      fill="#E0DEFF"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <circle
      cx="39.5897"
      cy="14.3436"
      r="4.16393"
      fill="#E0DEFF"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <defs>
      <filter
        id="filter0_dd_7084_82053"
        x="13.0664"
        y="0"
        width="43.8691"
        height="51.7539"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7084_82053"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_7084_82053"
          result="effect2_dropShadow_7084_82053"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_7084_82053"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default function DragImageUploadIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
