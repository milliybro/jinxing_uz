import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6667 15C15.3486 15 18.3333 12.0152 18.3333 8.33329C18.3333 4.65139 15.3486 1.66663 11.6667 1.66663C7.98477 1.66663 5 4.65139 5 8.33329C5 12.0152 7.98477 15 11.6667 15Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M2.6308 9.16663C2.02135 10.098 1.66699 11.2112 1.66699 12.4073C1.66699 15.6801 4.32014 18.3333 7.59296 18.3333C8.78908 18.3333 9.90233 17.979 10.8337 17.3695"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M13.143 6.83761C12.9628 6.07749 12.0458 5.39161 10.945 5.90473C9.84429 6.41786 9.66945 8.06882 11.3345 8.2442C12.087 8.32348 12.5776 8.15222 13.0269 8.63663C13.476 9.12104 13.5595 10.4683 12.4112 10.8314C11.2629 11.1944 10.1258 10.6271 10.002 9.82154M11.6555 5.00342V5.72762M11.6555 10.9431V11.6701"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CoinsDollarIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
