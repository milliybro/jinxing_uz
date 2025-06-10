import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Typography,
} from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import CSelect from '@/components/cselect'
import CloseIcon from '@/components/icons/close'
import UserCircleIcon from '@/components/icons/user-circle'
import EmehmonLightIcon from '@/components/icons/emehmon-light'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import DocumentValidationIcon from '@/components/icons/document-validation'

import banner from '../assets/main-banner.jpg'
import { useTranslation } from 'react-i18next'
import logo_white from '@/assets/uzlogo_white.png'
import dayjs from 'dayjs'

const { Title, Text } = Typography

const Intro = ({}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const changeLanguage = (val: string) => {
    i18n.changeLanguage(val)
    dayjs.locale(dayjs.locale(val === 'oz' ? 'uz-latn' : i18n.language))
  }

  return (
    <Layout className="w-full h-full bg-no-repeat bg-primary-dark bg-cover relative overflow-hidden">
      {/* <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="absolute top-0 left-0 w-full object-cover h-full opacity-10"
        poster="../main-banner.jpg"
      >
        <source
          src="../intro-video.mp4"
          width={1000}
          height={500}
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video> */}
      <img
        src={banner}
        alt="banner image"
        className="absolute brightness-50 opacity-20 top-0 left-0 w-full h-full"
      />
      <div className="relative">
        <div className="container max-w-[1200px] py-[40px]">
          <div className="flex items-center justify-between">
            {/* <EmehmonLightIcon /> */}
            <img width={153} src={logo_white} />
            <div className="flex flex-wrap gap-6">
              <Text className="text-white text-sm font-medium">
                {t('welcome.find-accommodation')}
              </Text>
              <Text className="text-white text-sm font-medium">
                {t('welcome.where-to-go')}
              </Text>
              <Text className="text-white text-sm font-medium">
                {' '}
                {t('welcome.tours')}
              </Text>
              <Text className="text-white text-sm font-medium">
                {' '}
                {t('welcome.transport')}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <CSelect
                placeholder="USD"
                className="[&_.ant-select-selector]:bg-transparent [&_.ant-select-selection-item]:text-white [&_.ant-select-selector]:border-transparent [&_.ant-select-selection-placeholder]:text-white [&_.ant-select-arrow_span]:text-white"
                options={[
                  { label: 'USD', value: 'usd' },
                  { label: 'UZS', value: 'uzs' },
                  { label: 'RUB', value: 'rub' },
                ]}
              />
              <CSelect
                className="[&_.ant-select-selector]:bg-transparent [&_.ant-select-selection-item]:text-white [&_.ant-select-selector]:border-transparent [&_.ant-select-selection-placeholder]:text-white [&_.ant-select-arrow_span]:text-white"
                rootClassName="shadow-none"
                size="large"
                variant="borderless"
                defaultValue={i18n.language}
                onChange={changeLanguage}
                options={[
                  {
                    label: "O'zbekcha",
                    value: 'oz',
                  },
                  { label: 'Ўзбекча', value: 'uz' },
                  { label: 'Русский', value: 'ru' },
                ]}
              />
              <Link
                to="/auth/sign-in"
                className="flex items-center border-none bg-primary-dark hover:bg-primary-dark/70 duration-200 px-[24px] text-white h-[58px] rounded-xl"
              >
                <UserCircleIcon className="text-[20px]" /> {t('welcome.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1200px] bg-transparent box-border mt-[66px] min-h-[653px] ">
        <Row gutter={[100, 100]} className="mb-[50px] items-center">
          <Col span={12}>
            <Title className="text-white max-w-[588px]">
              {t('welcome.intro.title')}
            </Title>
            <div className="text-[#B7BFD5] max-w-[588px]">
              {t('welcome.intro.text')}
            </div>
          </Col>
          <Col span={12}>
            <Card
              className="w-full rounded-[40px]"
              classNames={{ body: 'p-[32px]' }}
            >
              <div className="flex flex-col">
                <div className="text-[24px] font-medium mb-6">
                  {t('welcome.intro-card.title')}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-2">
                    <CheckmarkCircleIcon className="text-[20px] text-success" />
                    <Text className="text-sm">
                      {t('welcome.intro-card.field1')}
                    </Text>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckmarkCircleIcon className="text-[20px] text-success" />
                    <Text className="text-sm">
                      {t('welcome.intro-card.field2')}
                    </Text>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckmarkCircleIcon className="text-[20px] text-success" />
                    <Text className="text-sm">
                      {t('welcome.intro-card.field3')}
                    </Text>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckmarkCircleIcon className="text-[20px] text-success" />
                    <Text className="text-sm">
                      {t('welcome.intro-card.field4')}
                    </Text>
                  </div>
                  <Button
                    size="large"
                    type="primary"
                    className="bg-primary h-[58px] rounded-2xl hover:bg-primary/50"
                    onClick={() => setModalOpen(true)}
                  >
                    {t('welcome.start-free')}
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        closeIcon={null}
        classNames={{ content: 'p-[40px] rounded-[40px]' }}
      >
        <Button
          className="w-[40px] h-[40px] rounded-2xl absolute top-6 right-6 hover:border-primary hover:text-primary text-secondary border-secondary-light"
          icon={<CloseIcon className="text-[20px]" />}
          onClick={() => setModalOpen(false)}
        />
        <div className="flex flex-col items-center text-center mb-[24px]">
          <div className="w-[80px] h-[80px] bg-secondary-light mb-[32px] rounded-3xl text-secondary content-center">
            <DocumentValidationIcon className="text-[48px]" />
          </div>
          <Text className="text-[24px] font-bold mb-1">
            {t('welcome.request.title')}
          </Text>
          <Text className="text-base text-secondary">
            {t('welcome.request.desc')}
          </Text>
        </div>
        <Form layout="vertical">
          <Form.Item label="ИНН" name="inn" className="mb-[32px]">
            <Input
              size="large"
              variant="filled"
              placeholder="Введите ИНН"
              className="rounded-2xl h-[53px]"
            />
          </Form.Item>
          <Button
            size="large"
            type="primary"
            className="bg-primary h-[58px] w-full rounded-2xl hover:bg-primary/50"
          >
            {t('common.continue')}
          </Button>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Intro
