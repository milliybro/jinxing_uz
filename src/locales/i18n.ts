import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ru from './ru.json'
import uz from './uz.json'
import oz from './oz.json'

const translations = {
  uz: { translation: uz },
  oz: { translation: oz },
  ru: { translation: ru },
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: translations,
    lng: localStorage.getItem('i18nextLng') ?? 'ru',

    keySeparator: '.',
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => {
    console.error(err)
  })

export default i18n
