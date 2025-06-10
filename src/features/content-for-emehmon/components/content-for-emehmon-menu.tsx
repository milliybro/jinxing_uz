import React from 'react'
import { useTranslation } from 'react-i18next'

interface MenuProps {
  activeSection: string
  onScrollTo: (section: string) => void
}

const ContentForEMehmonMenu: React.FC<MenuProps> = ({
  activeSection,
  onScrollTo,
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-6 w-full">
        <div className="p-4 bg-white dark:bg-[#0F172A] rounded-xl w-full flex flex-col border dark:border-slate-800 items-start">
          <button
            onClick={() => onScrollTo('content')}
            className={`p-4 text-start font-normal text-base w-full ${
              activeSection === 'content'
                ? 'bg-[#F8F8FA] dark:bg-[#1d2741] dark:text-[#fcfcfc] rounded-lg'
                : 'text-[#1E1E1E] dark:text-[#fcfcfc]'
            }`}
          >
            {t('common.basic-information')}
          </button>
          <button
            onClick={() => onScrollTo('gallery')}
            className={`p-4 text-start font-normal text-base w-full ${
              activeSection === 'gallery'
                ? 'bg-[#F8F8FA] dark:bg-[#1d2741] dark:text-[#fcfcfc] rounded-lg'
                : 'text-[#1E1E1E] dark:text-[#fcfcfc]'
            }`}
          >
            {t('common.hotel-photos')}
          </button>
          <button
            onClick={() => onScrollTo('services')}
            className={`p-4 text-start font-normal text-base w-full ${
              activeSection === 'services'
                ? 'bg-[#F8F8FA] dark:bg-[#1d2741] dark:text-[#fcfcfc] rounded-lg'
                : 'text-[#1E1E1E] dark:text-[#fcfcfc]'
            }`}
          >
            {t('common.facilities-and-services')}
          </button>
          <button
            onClick={() => onScrollTo('terms')}
            className={`p-4 text-start font-normal text-base w-full ${
              activeSection === 'terms'
                ? 'bg-[#F8F8FA] dark:bg-[#1d2741] dark:text-[#fcfcfc] rounded-lg'
                : 'text-[#1E1E1E] dark:text-[#fcfcfc]'
            }`}
          >
            {t('common.accommodation-terms')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentForEMehmonMenu
