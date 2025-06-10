import NotificationsIllustration from '@/assets/notifications-illustration'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Form, message, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  createHotelContent,
  getFacilities,
  getHotelContent,
  updateHotelContent,
} from '../api'
import ContentForEMehmonContent from '../components/content-for-emehmon-content'
import ContentForEMehmonGallery from '../components/content-for-emehmon-gallery'
import ContentForEMehmonMenu from '../components/content-for-emehmon-menu'
import ContentForEMehmonServices from '../components/content-for-emehmon-services'
import ContentForEMehmonTerms from '../components/content-for-emehmon-terms'
import ContentForEMehmonHeader from '../containers/content-for-emehmon-header'
import { useImageStore } from '../hooks/useImageStore'
import { IHotelContent, IHotelContentForm } from '../types'

export default function ContentForEMehmon(): React.ReactElement {
  const contentRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const termsRef = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()
  const { setImages, images: imagesStore } = useImageStore()

  const [activeSection, setActiveSection] = useState('content')
  const [showBranchForm, setShowBranchForm] = useState(true)
  const [lang, setLang] = useState(i18n.language)

  const [form] = Form.useForm<IHotelContentForm>()

  const { data: hotelContent, isLoading: isContentLoading } = useQuery({
    queryKey: ['hotel-content', lang],
    queryFn: getHotelContent,
    onSuccess: ({ results }) => {
      const data = results[0]

      if (!data) {
        setShowBranchForm(false)
        return
      } else {
        setShowBranchForm(true)
      }

      setImages(
        results[0].images?.map((img) => ({ ...img, file: null, id: img.id })) ||
          [],
      )

      form.setFieldsValue({
        ...data,
        checkin_start: data.checkin_start
          ? dayjs(data.checkin_start, 'HH:mm')
          : null,
        checkout_end: data.checkout_end
          ? dayjs(data.checkout_end, 'HH:mm')
          : null,
        facilities: data.facilities as number[],
        children_allowed: String(data.children_allowed),
        animals_allowed: String(data.animals_allowed),
        payment_types: data.payment_types as number[],
        name: {
          en: data.translations.en.name,
          ru: data.translations.ru.name,
          uz_cyrillic: data.translations['uz-cyrillic'].name,
          uz_latin: data.translations['uz-latin'].name,
        },
        description: {
          en: data.translations.en.description,
          ru: data.translations.ru.description,
          uz_cyrillic: data.translations['uz-cyrillic'].description,
          uz_latin: data.translations['uz-latin'].description,
        },
        address: data.translations.en.address,
      })
    },
    cacheTime: 0,
    enabled: true,
  })

  const { data: facilities } = useQuery({
    queryFn: async () => {
      const res = await getFacilities(hotelContent?.results[0]?.id)
      return res
    },
    queryKey: ['facilities'],
    enabled: true,
  })

  const handleScrollTo = (section: string) => {
    setActiveSection(section)

    const header = document.getElementById('header')
    const topHeader = document.getElementById('top-header')

    const headerHeight = header?.offsetHeight || 0
    const topHeaderHeight = topHeader?.offsetHeight || 0
    const totalOffset = headerHeight + topHeaderHeight

    const refMap: { [key: string]: React.RefObject<HTMLDivElement> } = {
      content: contentRef,
      gallery: galleryRef,
      services: servicesRef,
      terms: termsRef,
    }

    const targetRef = refMap[section]

    if (targetRef.current) {
      const elementPosition =
        targetRef.current.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - totalOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleScroll = () => {
    if (
      !contentRef.current ||
      !galleryRef.current ||
      !servicesRef.current ||
      !termsRef.current
    )
      return

    const contentTop =
      contentRef.current.getBoundingClientRect().top + window.scrollY
    const galleryTop =
      galleryRef.current.getBoundingClientRect().top + window.scrollY
    const servicesTop =
      servicesRef.current.getBoundingClientRect().top + window.scrollY
    const termsTop =
      termsRef.current.getBoundingClientRect().top + window.scrollY

    if (termsTop < window.scrollY + window.innerHeight / 2) {
      setActiveSection('terms')
    } else if (servicesTop < window.scrollY + window.innerHeight / 2) {
      setActiveSection('services')
    } else if (galleryTop < window.scrollY + window.innerHeight / 2) {
      setActiveSection('gallery')
    } else if (contentTop < window.scrollY + window.innerHeight / 2) {
      setActiveSection('content')
    }
  }

  useEffect(() => {
    const header = document.getElementById('header')
    const topHeader = document.getElementById('top-header')
    const sidebar = document.getElementById('sidebar')
    const emptyDisplay = document.getElementById('empty-display')

    function calculateTop() {
      const headerHeight = header?.offsetHeight
      if (topHeader && sidebar && headerHeight) {
        topHeader.style.top = `${headerHeight}px`
        sidebar.style.top = `${headerHeight + topHeader?.offsetHeight}px`
      }
      if (!!emptyDisplay && headerHeight) {
        emptyDisplay.style.height = `${
          window.innerHeight - headerHeight - 40
        }px`
      }
    }

    calculateTop()

    window.addEventListener('resize', calculateTop)

    return () => {
      window.removeEventListener('resize', calculateTop)
    }
  }, [showBranchForm])

  useEffect(() => {
    // refetch()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  async function onSubmit(values: IHotelContentForm) {
    const translations = {
      en: {
        name: values.name.en,
        description: values.description.en,
        address: values.address,
        slug: values.name.en?.toLowerCase().replace(' ', '-'),
      },
      ru: {
        name: values.name.ru,
        description: values.description.ru,
        address: values.address,
        slug: values.name.ru?.toLowerCase().replace(' ', '-'),
      },
      'uz-cyrillic': {
        name: values.name.uz_cyrillic,
        description: values.description.uz_cyrillic,
        address: values.address,
        slug: values.name.uz_cyrillic?.toLowerCase().replace(' ', '-'),
      },
      'uz-latin': {
        name: values.name.uz_latin,
        description: values.description.uz_latin,
        address: values.address,
        slug: values.name.uz_latin?.toLowerCase().replace(' ', '-'),
      },
    }

    const formData = new FormData()

    imagesStore.forEach((img, i) => {
      if (img.file) {
        formData.append(`images[${i}]image`, img.file)
        formData.append(`images[${i}]is_main`, String(img.is_main))
      } else if (img.id) {
        formData.append(`images[${i}]id`, img.id.toString())
        formData.append(`images[${i}]is_main`, String(img.is_main))
      }
    })

    // always set country to 1 (Uzbekistan)
    formData.append('country', '1')

    const updatedValues: Partial<IHotelContent> = {
      ...values,
      checkin_start: dayjs(values.checkin_start)?.format('HH:mm:ss'),
      translations,
      checkout_end: dayjs(values.checkout_end)?.format('HH:mm:ss'),
      facilities: values?.facilities || [],
      payment_types: values?.payment_types || [],
      // country: values.country,
      // images: imagesStore,
    }

    imagesStore.forEach((img) => {
      if (img.file) {
        formData.append(`images`, img.file)
      }
    })

    if (!!hotelContent?.results[0]) {
      await updateHotelContent(
        formData as any,
        hotelContent?.results[0]?.id as number,
      )
      await updateHotelContent(
        updatedValues,
        hotelContent?.results[0]?.id as number,
      )
        .then(() => {
          message.success(t('common.changes-successfully-saved'))
        })
        .then(() => {
          window.location.reload()
        })
    } else {
      await createHotelContent(updatedValues)
        .then(async (hotel) => {
          await updateHotelContent(updatedValues, hotel.id as number)
        })
        .then(() => {
          message.success(t('common.changes-successfully-saved'))
        })
        .then(() => {
          window.location.reload()
        })
    }
  }

  return (
    <>
      {showBranchForm && (
        <div className="flex flex-col relative min-h-screen">
          <div
            id="top-header"
            className="container sticky left-0 right-0 z-10 m-0 dark:bg-[#0F172A] bg-[#F8FAFC]"
          >
            <ContentForEMehmonHeader />
          </div>
          <div className="container">
            <div className="flex w-full gap-6 mt-[10px]">
              <div id="sidebar" className="sticky h-full w-1/4">
                <ContentForEMehmonMenu
                  activeSection={activeSection}
                  onScrollTo={handleScrollTo}
                />
              </div>
              <div className="relative w-3/4">
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={onSubmit}
                  scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
                >
                  <div ref={contentRef}>
                    <ContentForEMehmonContent
                      form={form}
                      setLang={setLang}
                      lang={lang}
                    />
                  </div>
                  <div ref={galleryRef}>
                    <ContentForEMehmonGallery isLoading={isContentLoading} />
                  </div>
                  <div ref={servicesRef}>
                    <ContentForEMehmonServices facilities={facilities} />
                  </div>
                  <div ref={termsRef}>
                    <ContentForEMehmonTerms />
                  </div>
                  <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl w-full flex justify-end border dark:border-slate-800 gap-6">
                    <Button size="large" htmlType="button">
                      {t('common.cancel')}
                    </Button>
                    <Button size="large" type="primary" htmlType="submit">
                      {t('common.save-changes')}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
      {!showBranchForm && (
        <div
          className="flex flex-col gap-5 items-center justify-center"
          id="empty-display"
        >
          <NotificationsIllustration />
          <Typography.Title level={4} className="text-center">
            Добавьте гостиницу уже сегодня!
          </Typography.Title>
          <Typography.Text className="text-center text-secondary">
            Добавьте ее на Milly-Turizm.uz и начните эффективное <br />{' '}
            управление прямо сейчас.
          </Typography.Text>
          <Button
            icon={<PlusCircleOutlined />}
            className="text-blue-500 text-lg"
            type="text"
            size="large"
            onClick={() => setShowBranchForm(true)}
          >
            Добавить гостиницу
          </Button>
        </div>
      )}
    </>
  )
}
