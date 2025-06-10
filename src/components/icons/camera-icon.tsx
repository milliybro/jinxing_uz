import Icon from '@ant-design/icons/lib/components/Icon'

import React, { ReactElement } from 'react'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon = (): React.ReactElement => (
  <svg
    width="70"
    height="52"
    viewBox="0 0 70 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.05172 8.99305L17.2131 7.13281V40.9853L12.3018 42.0192C9.01306 42.7116 5.79705 40.5679 5.17081 37.2659L1.14319 16.0294C0.515988 12.7223 2.73148 9.54642 6.05172 8.99305Z"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <path
      d="M63.9483 8.99305L52.7869 7.13281V40.9853L57.6982 42.0192C60.9869 42.7116 64.203 40.5679 64.8292 37.2659L68.8568 16.0294C69.484 12.7223 67.2685 9.54642 63.9483 8.99305Z"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <g filter="url(#filter0_dd_8288_94457)">
      <rect
        x="17.0664"
        y="1.24609"
        width="35.8689"
        height="42.7541"
        rx="5"
        stroke="#635BFF"
        strokeWidth="2"
        shapeRendering="crispEdges"
      />
    </g>
    <path
      d="M47.9353 44.0007H22.0664C19.305 44.0007 17.0664 41.7621 17.0664 39.0007L17.0664 35.5396L29.4732 22.3918L38.9834 33.3357C39.7841 34.2571 41.2162 34.2525 42.011 33.326L47.2464 27.2231L52.9353 33.3445V39.0007C52.9353 41.7621 50.6967 44.0007 47.9353 44.0007Z"
      fill="currentColor"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <circle
      cx="39.5897"
      cy="14.5897"
      r="4.16393"
      fill="currentColor"
      stroke="#635BFF"
      strokeWidth="2"
    />
    <defs>
      <filter
        id="filter0_dd_8288_94457"
        x="13.0664"
        y="0.246094"
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
          result="effect1_dropShadow_8288_94457"
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
          in2="effect1_dropShadow_8288_94457"
          result="effect2_dropShadow_8288_94457"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_8288_94457"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default function CameraIcon(
  props: Partial<CustomIconComponentProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
