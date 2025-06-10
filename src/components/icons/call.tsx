import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.1481 9.95196C2.35808 8.57438 1.97662 7.44953 1.74661 6.3093C1.40643 4.62294 2.18492 2.97564 3.47456 1.92452C4.01962 1.48028 4.64444 1.63206 4.96675 2.21029L5.6944 3.51572C6.27116 4.55044 6.55953 5.06779 6.50233 5.61629C6.44514 6.16479 6.05622 6.61151 5.27839 7.50497L3.1481 9.95196ZM3.1481 9.95196C4.74717 12.7402 7.25661 15.251 10.0481 16.852M10.0481 16.852C11.4257 17.642 12.5505 18.0235 13.6907 18.2535C15.3771 18.5936 17.0244 17.8151 18.0755 16.5255C18.5197 15.9805 18.368 15.3556 17.7897 15.0333L16.4843 14.3056C15.4496 13.7289 14.9322 13.4405 14.3837 13.4977C13.8352 13.5549 13.3885 13.9438 12.4951 14.7216L10.0481 16.852Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CallIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
