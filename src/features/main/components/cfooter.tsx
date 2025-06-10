import { Link } from 'react-router-dom'
import { Col, Divider, Flex, Layout, Row, Typography } from 'antd'

import FacebookIcon from '@/components/icons/facebook'
import InstagramIcon from '@/components/icons/instagram'
import TelegramIcon from '@/components/icons/telegram'
import EmehmonDarkIcon from '@/components/icons/emehmon-dark'
import { useTranslation } from 'react-i18next'
import logo from '@/assets/logo.png'

const CFooter = () => {
  const { t } = useTranslation()

  const colTwo = [
    { name: t('footer.hotels'), path: '/hotels' },
    { name: t('footer.houses-and-apartments'), path: '/houses-and-apartments' },
    { name: t('footer.apartments'), path: '/apartments' },
    { name: t('footer.resort-hotels'), path: '/resort-hotels' },
    { name: t('footer.hostels'), path: '/hostels' },
    { name: t('footer.guest-houses'), path: '/guest-houses' },
  ]

  const colThree = [
    { name: t('footer.unique-accommodation'), path: '/unique-accommodation' },
    { name: t('footer.reviews'), path: '/reviews' },
    { name: t('footer.travel-community'), path: '/travel-community' },
    { name: t('footer.seasonal-specials'), path: '/seasonal-specials' },
    { name: t('footer.car-search'), path: '/car-search' },
    { name: t('footer.manage-bookings'), path: '/manage-bookings' },
  ]
  const colOne = [
    { name: t('footer.regions'), path: '/regions' },
    { name: t('footer.center'), path: '/news' },
    { name: t('footer.district'), path: '/support' },
    { name: t('footer.airports'), path: '/airports' },
    { name: t('footer.orients'), path: '/oreints' },
  ]

  return (
    <Layout.Footer className=" bg-[#F8F8FA]">
      <div className="container py-9 ">
        <Row gutter={16}>
          <Col span={7}>
            <Flex vertical>
              <img width={153} className='mb-6' src={logo} />

              <div className="max-w-[282px] text-sm mb-[50px] text-secondary">
                {t('footer.text')}
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <a href="http://facebook.com/">
                    <FacebookIcon className="text-[24px]" />
                  </a>
                </div>
                <div>
                  <a href="http://instagram.com/">
                    <InstagramIcon className="text-[24px]" />
                  </a>
                </div>
                <div>
                  <a href="http://telegram.org/">
                    <TelegramIcon className="text-[24px]" />
                  </a>
                </div>
              </div>
            </Flex>
          </Col>
          <Col span={17}>
            <Row gutter={16} className="mt-[64px]">
              <Col span={8}>
                <ul className="flex flex-col gap-3 text-[15px]">
                  {colOne.map((val, i) => (
                    <li key={val.name + i}>
                      <Link
                        to={val.path}
                        className="text-[#777E90] hover:underline"
                      >
                        {val.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col span={8}>
                <ul className="flex flex-col gap-3 text-[15px]">
                  {colTwo.map((val, i) => (
                    <li key={val.name + i}>
                      <Link
                        to={val.path}
                        className="text-[#777E90] hover:underline"
                      >
                        {val.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col span={8}>
                <ul className="flex flex-col gap-3 text-[15px]">
                  {colThree.map((val, i) => (
                    <li key={val.name + i}>
                      <Link
                        to={val.path}
                        className="text-[#777E90] hover:underline"
                      >
                        {val.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Divider />
      <Flex className="text-center py-9" justify="center">
        <Typography.Text className="text-secondary">
          Milliy Turizm © {new Date().getFullYear()}. {t('common.all-reserved')}{' '}
        </Typography.Text>
      </Flex>
    </Layout.Footer>
  )
}

export default CFooter
