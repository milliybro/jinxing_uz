import { useCallback, useRef } from 'react'
import { Carousel, Flex, Typography } from 'antd'

import ReviewsCard from '../components/reviews-card'
import ArrowLeftLongIcon from '@/components/icons/arrow-left-long'

import type { CarouselRef } from 'antd/es/carousel'
import { useTranslation } from 'react-i18next'

const Reviews = () => {
  const { t } = useTranslation()

  const sliderRef = useRef<CarouselRef>(null)

  const handlePrev = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.prev()
    }
  }, [])

  const handleNext = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.next()
    }
  }, [])

  return (
    <div className=" bg-[#232E40]/90 overflow-hidden">
      <div className="container max-w-[1200px] py-[80px]">
        <Flex justify="space-between" className="mb-[40px] items-center">
          <Typography.Title level={2} className="text-white m-0">
            {t('welcome.reviews.title')}
          </Typography.Title>
          <div className="flex flex-row gap-4">
            <button
              onClick={handlePrev}
              className="h-11 w-11 flex items-center justify-center border text-white border-transparent duration-300 hover:border-secondary rounded-full"
            >
              <ArrowLeftLongIcon className="text-[24px]" />
            </button>
            <button
              onClick={handleNext}
              className="h-11 w-11 flex items-center justify-center border text-white border-transparent duration-300 hover:border-secondary rounded-full"
            >
              <ArrowLeftLongIcon className="text-[24px] rotate-180" />
            </button>
          </div>
        </Flex>

        <Carousel
          ref={sliderRef}
          slidesToShow={2.4}
          dots={false}
          infinite={false}
          className="[&>.slick-list]:overflow-visible [&>.slick-slide]:!h-full custom-carousel-class"
        >
          <ReviewsCard
            key={'main-slide-tourists-item-'}
            review={t('welcome.reviews.review')}
            rating={3}
            user={{
              id: 123,
              username: 'username',
              first_name: 'Азиза',
              middle_name: 'Муминова123',
              last_name: 'Муминова',
              avatar: 'string',
            }}
          />
          <ReviewsCard
            key={'main-slide-tourists-item-'}
            review={t('welcome.reviews.review')}
            rating={3}
            user={{
              id: 123,
              username: 'username',
              first_name: 'Азиза',
              middle_name: 'Муминова123',
              last_name: 'Муминова',
              avatar: 'string',
            }}
          />
          <ReviewsCard
            key={'main-slide-tourists-item-'}
            review={t('welcome.reviews.review')}
            rating={3}
            user={{
              id: 123,
              username: 'username',
              first_name: 'Азиза',
              middle_name: 'Муминова123',
              last_name: 'Муминова',
              avatar: 'string',
            }}
          />
          <ReviewsCard
            key={'main-slide-tourists-item-'}
            review={t('welcome.reviews.review')}
            rating={3}
            user={{
              id: 123,
              username: 'username',
              first_name: 'Азиза',
              middle_name: 'Муминова123',
              last_name: 'Муминова',
              avatar: 'string',
            }}
          />
          <ReviewsCard
            key={'main-slide-tourists-item-'}
            review={t('welcome.reviews.review')}
            rating={3}
            user={{
              id: 123,
              username: 'username',
              first_name: 'Азиза',
              middle_name: 'Муминова123',
              last_name: 'Муминова',
              avatar: 'string',
            }}
          />
        </Carousel>
      </div>
    </div>
  )
}

export default Reviews
