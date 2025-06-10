import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.66675 12.4997C8.66675 12.4997 9.33341 12.4997 10.0001 13.833C10.0001 13.833 12.1177 10.4997 14.0001 9.83301"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.33325 15.166H7.15143C4.9773 15.166 3.89023 15.166 3.1353 14.6341C2.919 14.4817 2.72697 14.301 2.56505 14.0974C1.99992 13.3869 1.99992 12.3638 1.99992 10.3175V8.62056C1.99992 6.64511 1.99992 5.65739 2.31254 4.86852C2.81513 3.6003 3.87801 2.59994 5.22549 2.12692C6.06367 1.83268 7.11313 1.83268 9.21204 1.83268C10.4114 1.83268 11.0111 1.83268 11.4901 2.00082C12.2601 2.27111 12.8674 2.84275 13.1546 3.56744C13.3333 4.01823 13.3333 4.58264 13.3333 5.71147V7.16602"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.00008 8.5C2.00008 7.2727 2.995 6.27778 4.2223 6.27778C4.66616 6.27778 5.18944 6.35555 5.62099 6.23992C6.00443 6.13718 6.30392 5.83768 6.40667 5.45424C6.5223 5.02269 6.44453 4.49941 6.44453 4.05556C6.44453 2.82826 7.43945 1.83333 8.66675 1.83333"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function FileVerifiedIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
