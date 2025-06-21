import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { join } from 'path'

export const initI18n = async (language: string): Promise<void> => {
  await i18next.use(Backend).init({
    lng: language,
    fallbackLng: 'en',
    backend: {
      loadPath: join(__dirname, '../../locales/{{lng}}.json')
    }
  })
}

export const getLanguage = (): string => i18next.language

export const setLanguage = async (lang: string): Promise<string> => {
  await i18next.changeLanguage(lang)

  return i18next.language
}
