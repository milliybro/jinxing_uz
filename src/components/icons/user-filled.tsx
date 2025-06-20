import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.8059 14.8372C17.9223 14.9064 18.0659 14.9875 18.2286 15.0793C18.9414 15.4814 20.0189 16.0893 20.7571 16.8118C21.2188 17.2637 21.6574 17.8592 21.7372 18.5888C21.822 19.3646 21.4835 20.0927 20.8045 20.7396C19.633 21.8556 18.2272 22.75 16.4089 22.75H7.59068C5.77237 22.75 4.36658 21.8556 3.19514 20.7396C2.51612 20.0927 2.17766 19.3646 2.26246 18.5888C2.34221 17.8592 2.78086 17.2637 3.24253 16.8118C3.9807 16.0893 5.05821 15.4814 5.77102 15.0793C5.93368 14.9875 6.07737 14.9064 6.19368 14.8372C9.74772 12.7209 14.2519 12.7209 17.8059 14.8372Z"
      fill="currentColor"
    />
    <path
      d="M6.74981 6.5C6.74981 3.6005 9.10032 1.25 11.9998 1.25C14.8993 1.25 17.2498 3.6005 17.2498 6.5C17.2498 9.39949 14.8993 11.75 11.9998 11.75C9.10032 11.75 6.74981 9.39949 6.74981 6.5Z"
      fill="currentColor"
    />
  </svg>
)

export default function UserFilledIcon(props: Partial<IProps>): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
