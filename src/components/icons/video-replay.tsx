import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.75 18.2801C13.7733 18.4174 12.4997 18.4174 10.7917 18.4174H9.20834C5.84959 18.4174 4.17021 18.4174 3.12678 17.3739C2.08334 16.3304 2.08334 14.6511 2.08334 11.2924V9.70902C2.08334 6.35023 2.08334 4.67084 3.12678 3.62741C4.17021 2.58398 5.84959 2.58398 9.20834 2.58398H10.7917C14.1504 2.58398 15.8298 2.58398 16.8733 3.62741C17.9167 4.67084 17.9167 6.35023 17.9167 9.70902V11.2924C17.9167 12.2992 17.9167 13.1551 17.8886 13.8882C17.866 14.4758 17.8548 14.7695 17.6323 14.8793C17.4098 14.9891 17.1609 14.813 16.6632 14.4609L15.5417 13.6674"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.4544 10.8296C12.3072 11.3519 11.6111 11.721 10.2191 12.4591C8.87332 13.1726 8.20049 13.5295 7.65826 13.3861C7.43407 13.3267 7.22982 13.2141 7.06509 13.059C6.66666 12.6838 6.66666 11.9561 6.66666 10.5006C6.66666 9.04523 6.66666 8.31747 7.06509 7.94227C7.22982 7.78716 7.43407 7.67455 7.65826 7.61526C8.20049 7.47185 8.87332 7.82862 10.2191 8.54217C11.6111 9.28032 12.3072 9.6494 12.4544 10.1716C12.5152 10.3872 12.5152 10.6141 12.4544 10.8296Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
)

export default function VideoReplayIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
