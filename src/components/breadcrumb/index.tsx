import { Link } from 'react-router-dom'
import { Breadcrumb as CBreadcrumb, Typography } from 'antd'

import ArrowRightIcon from '../icons/arrow-right'

import type { FC } from 'react'
import type { BreadcrumbProps } from 'antd'

const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  return (
    <CBreadcrumb
      {...props}
      className="py-6"
      separator={<ArrowRightIcon />}
      itemRender={(route) => {
        return route.href ? (
          <Link to={route.href || '/'} className="font-medium text-inherit">
            {route.title}
          </Link>
        ) : (
          <Typography.Text className="font-medium text-inherit">
            {route.title}
          </Typography.Text>
        )
      }}
    />
  )
}

export default Breadcrumb
