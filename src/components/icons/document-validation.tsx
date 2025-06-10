import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M29.9609 14.5312C29.9609 14.5312 30.9609 15.5312 31.9609 17.5312C31.9609 17.5312 35.1373 12.5312 37.9609 11.5312"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.9897 4.54281C14.9928 4.33123 11.1322 4.90687 11.1322 4.90687C8.69454 5.08117 4.02292 6.44782 4.02296 14.4292C4.023 22.3428 3.97128 32.0986 4.02296 35.988C4.02296 38.364 5.4942 43.9068 10.5865 44.2038C16.7762 44.5648 27.9254 44.6416 33.041 44.2038C34.4102 44.1266 38.9692 43.0516 39.5462 38.0914C40.144 32.9528 40.025 29.3814 40.025 28.5314"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M43.9999 14.5312C43.9999 20.0541 39.5183 24.5312 33.9901 24.5312C28.4621 24.5312 23.9805 20.0541 23.9805 14.5312C23.9805 9.00841 28.4621 4.53125 33.9901 4.53125C39.5183 4.53125 43.9999 9.00841 43.9999 14.5312Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M13.9609 26.5312H21.961"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M13.9609 34.5312H29.961"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

export default function DocumentValidationIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
