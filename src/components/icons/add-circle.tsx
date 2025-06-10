import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1666 7.1665V13.8332M13.4999 10.4998H6.83325"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.4999 10.4998C18.4999 5.89746 14.7689 2.1665 10.1666 2.1665C5.56421 2.1665 1.83325 5.89746 1.83325 10.4998C1.83325 15.1022 5.56421 18.8332 10.1666 18.8332C14.7689 18.8332 18.4999 15.1022 18.4999 10.4998Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
  </svg>
)

export default function AddCircleIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
