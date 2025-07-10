import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import useSystemStore from '../stores/system'

export const initI18n = async (lng: string): Promise<void> => {
  const { languages, setLanguages } = useSystemStore.getState()

  const modules: Record<string, { default: Record<string, string> }> = import.meta.glob(
    '../../../locales/*.json',
    { eager: true }
  )

  const resources = {}
  const languagesArr: { key: string; label: string; countryCode: string }[] = []

  for (const path in modules) {
    const match = path.match(/([a-z]{2})\.json$/i)
    if (match) {
      const lang = match[1]
      const translation = modules[path].default

      resources[lang] = {
        translation
      }

      languagesArr.push({
        key: lang,
        label: translation.language,
        countryCode: translation.countryCode
      })
    }
  }

  if (!languages) {
    setLanguages(languagesArr)
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
