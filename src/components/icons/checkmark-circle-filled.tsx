import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 18.75C0 8.39466 8.39466 0 18.75 0C29.1053 0 37.5 8.39466 37.5 18.75C37.5 29.1053 29.1053 37.5 18.75 37.5C8.39466 37.5 0 29.1053 0 18.75Z"
      fill="#3276FF"
      fillOpacity="0.2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 18.75C8 24.6871 12.8129 29.5 18.75 29.5C24.6871 29.5 29.5 24.6871 29.5 18.75C29.5 12.8129 24.6871 8 18.75 8C12.8129 8 8 12.8129 8 18.75ZM23.4257 15.0128C23.8328 15.386 23.8603 16.0186 23.4872 16.4257L17.9872 22.4257C17.8028 22.6268 17.5444 22.7438 17.2717 22.7498C16.999 22.7557 16.7358 22.65 16.5429 22.4571L14.0429 19.9571C13.6524 19.5666 13.6524 18.9334 14.0429 18.5429C14.4334 18.1524 15.0666 18.1524 15.4571 18.5429L17.2186 20.3044L22.0128 15.0743C22.386 14.6672 23.0186 14.6397 23.4257 15.0128Z"
      fill="#3276FF"
    />
  </svg>
)

export default function CheckmarkCircleFilledIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
