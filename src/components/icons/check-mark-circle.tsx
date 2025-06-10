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
      d="M15.668 2.4578C14.7209 2.16035 13.7132 2 12.668 2C7.14512 2 2.66797 6.47715 2.66797 12C2.66797 17.5228 7.14512 22 12.668 22C18.1908 22 22.668 17.5228 22.668 12C22.668 10.9548 22.5076 9.94704 22.2102 9"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9.16797 9.5L12.668 13L21.6682 3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

export default function CheckMarkCircleIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
