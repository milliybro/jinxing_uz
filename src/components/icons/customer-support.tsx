import Icon from '@ant-design/icons/lib/components/Icon'

import type { ReactElement, FC } from 'react'
import type { CustomIconComponentProps as IProps } from '@ant-design/icons/lib/components/Icon'

const defaultIcon: FC = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.4166 6.3026C10.4166 6.10099 10.4166 6.00018 10.447 5.91031C10.5352 5.64926 10.7677 5.54794 11.0006 5.44185C11.2625 5.32258 11.3934 5.26294 11.5231 5.25245C11.6704 5.24054 11.8179 5.27227 11.9438 5.34292C12.1107 5.43657 12.2271 5.61454 12.3462 5.75926C12.8965 6.42766 13.1717 6.76186 13.2724 7.13041C13.3536 7.42782 13.3536 7.73884 13.2724 8.03626C13.1255 8.57379 12.6616 9.02438 12.3182 9.44148C12.1425 9.65484 12.0547 9.76151 11.9438 9.82375C11.8179 9.8944 11.6704 9.92613 11.5231 9.91422C11.3934 9.90372 11.2625 9.84409 11.0006 9.72482C10.7677 9.61872 10.5352 9.51741 10.447 9.25635C10.4166 9.16648 10.4166 9.06568 10.4166 8.86407V6.3026Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M4.58325 6.30269C4.58325 6.0488 4.57612 5.82062 4.37087 5.64212C4.29621 5.57719 4.19723 5.53211 3.99928 5.44194C3.73742 5.32267 3.60649 5.26304 3.47676 5.25255C3.08754 5.22107 2.87812 5.48672 2.65366 5.75935C2.10336 6.42776 1.8282 6.76196 1.72752 7.1305C1.64627 7.42792 1.64627 7.73894 1.72752 8.03636C1.87437 8.57389 2.3383 9.02447 2.68171 9.44157C2.89817 9.70449 3.10495 9.94438 3.47676 9.91431C3.60649 9.90382 3.73742 9.84419 3.99928 9.72491C4.19723 9.63475 4.29621 9.58967 4.37087 9.52474C4.57612 9.34624 4.58325 9.11806 4.58325 8.86417V6.30269Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M3.41663 5.25C3.41663 3.317 5.2448 1.75 7.49996 1.75C9.75512 1.75 11.5833 3.317 11.5833 5.25"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M11.5833 9.91602V10.3827C11.5833 11.4136 10.5386 12.2493 9.24992 12.2493H8.08325"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function CustomerSupportIcon(
  props: Partial<IProps>,
): ReactElement {
  return <Icon component={defaultIcon} {...props} />
}
