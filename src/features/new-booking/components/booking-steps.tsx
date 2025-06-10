import { Steps } from 'antd'
import { useTranslation } from 'react-i18next'

import useStepParams from '@/hooks/use-step-params'

const steps = [
  {
    title: 'search-for-a-guest',
    content: 'First-content',
    step: 1,
  },
  {
    title: 'basic-information',
    content: 'Second-content',
    step: 2,
  },
  {
    title: 'additional-information',
    content: 'Third-content',
    step: 3,
  },
  {
    title: 'information-about-children',
    content: 'Forth-content',
    step: 4,
  },
  {
    title: 'guest-information',
    content: 'Last-content',
    step: 5,
  },
]

const BookingSteps = () => {
  const { step, setStep, next, prev, searchParams, setSearchParams } =
    useStepParams()
  const { t } = useTranslation()

  const items = steps.map((item) => ({
    key: item.title,
    title: t('common.' + item.title),
    action: item.step,
  }))

  const handleStepChange = (currentStep: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('step', `${currentStep + 1}`)
    setSearchParams(newParams)
  }

  return (
    <Steps
      current={step - 1}
      items={items}
      onChange={handleStepChange}
      className="mb-6 custom-steps [&_.ant-steps-item-title]:font-semibold [&_.ant-steps-item-title]:text-primary-dark dark:[&_.ant-steps-item-title]:text-secondary dark:[&_.ant-steps-icon]:text-white dark:hover:[&_.ant-steps-icon]:text-inherit"
    />
  )
}

export default BookingSteps
