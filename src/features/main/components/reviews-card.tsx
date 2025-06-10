import {
  Avatar,
  Card,
  ConfigProvider,
  Divider,
  Flex,
  Rate,
  Typography,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'

import QuoteIcon from '@/components/icons/quote'

import type { FC } from 'react'

interface IProps {
  light?: boolean
  review: string
  rating: number
  user: {
    id: number
    username: string
    first_name: string
    middle_name: string
    last_name: string
    avatar: string
  }
}

const ReviewsCard: FC<IProps> = ({ light, review, rating, user }) => {
  return (
    <Card
      bordered={false}
      className={` overflow-hidden mr-6 rounded-3xl h-full flex flex-col ${
        light ? 'bg-white' : 'bg-[#232E40]'
      }`}
      classNames={{ body: 'px-6 py-8' }}
    >
      <Flex vertical className="h-full">
        <QuoteIcon className="text-[24px] text-secondary mb-6" />
        <div className="flex-1">
          <Typography.Text
            className={`leading-[160%] ${light ? '' : 'text-white'}`}
          >
            {review}
          </Typography.Text>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorSplit: 'rgba(119, 126, 144, 0.20)',
            },
          }}
        >
          <Divider className=" border-border/10" />
        </ConfigProvider>
        <Flex gap={24} align="center">
          <Avatar size="large" icon={<UserOutlined />} src={user?.avatar} />
          <Flex vertical>
            <Typography.Text
              className={`text-sm mb-1 ${light ? '' : 'text-white'}`}
            >
              {user?.first_name + ' ' + user?.last_name}
            </Typography.Text>
            <Rate
              className=" text-sm"
              disabled
              allowHalf
              defaultValue={rating}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default ReviewsCard
