import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const initI18n = async (lng: string): Promise<void> => {
  const modules: Record<string, { default: Record<string, string> }> = import.meta.glob(
    '../../../locales/*.json',
    { eager: true }
  )

  const resources = {}

  for (const path in modules) {
    const match = path.match(/([a-z]{2})\.json$/i)
    if (match) {
      const lang = match[1]
      resources[lang] = {
        translation: modules[path].default
      }
    }
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
}

export default i18n
