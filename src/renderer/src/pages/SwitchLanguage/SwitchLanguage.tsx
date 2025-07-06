import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectItem } from '@heroui/react'
import Flag from 'react-world-flags'
import styles from './SwitchLanguage.module.css'
import { FaArrowRight } from 'react-icons/fa'
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch'

const LANGUAGES = [
  //TODO fix that
  { key: 'en', label: 'English', countryCode: 'US' },
  { key: 'ru', label: 'Русский', countryCode: 'RU' },
  { key: 'fr', label: 'Français', countryCode: 'FR' },
  { key: 'de', label: 'Deutsch', countryCode: 'DE' },
  { key: 'ja', label: '日本語', countryCode: 'JP' },
  { key: 'zh', label: '中文', countryCode: 'CN' }
]

const SwitchLanguage = (): React.ReactElement => {
  const { i18n, t } = useTranslation()
  const [selectedLangCode, setSelectedLangCode] = useState<string | null>(null)

  const handleChange = async (langCode: string): Promise<void> => {
    const lang = LANGUAGES.find((l) => l.key === langCode)
    if (!lang) return

    await i18n.changeLanguage(langCode)
    await window.api.saveConfigValue('language', langCode)
    await window.api.saveConfigValue('userSelectLanguage', true)
    setSelectedLangCode(langCode)
  }

  const selectedLang = LANGUAGES.find((l) => l.key === selectedLangCode)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('selectYourLanguage')}</h1>

        <Select
          className={styles.select}
          label={t('languageWord')}
          items={LANGUAGES}
          selectedKeys={selectedLangCode ? [selectedLangCode] : []}
          placeholder={t('selectLanguage')}
          onSelectionChange={(keys) => handleChange(Array.from(keys)[0] as string)}
          popoverProps={{
            className: styles.selectPopover
          }}
        >
          {(lang) => (
            <SelectItem key={lang.key} textValue={lang.label}>
              <div className={styles.selectItem}>
                <Flag
                  code={lang.countryCode}
                  style={{ width: 20, height: 15, borderRadius: 3, pointerEvents: 'none' }}
                />
                <span>{lang.label}</span>
              </div>
            </SelectItem>
          )}
        </Select>

        <div className={styles.selected}>
          {t('selected')}:
          <span className={styles.selectedLang}>
            <Flag
              style={{ width: 20, height: 15, borderRadius: 3, pointerEvents: 'none' }}
              code={selectedLang?.countryCode}
            />
            {selectedLang?.label || '-'}
          </span>
        </div>
      </div>

      {selectedLang && (
        <button className={styles.nextButton} onClick={() => {}}>
          <FaArrowRight size={20} />
        </button>
      )}

      <ThemeSwitch isFloating />
    </div>
  )
}

export default SwitchLanguage
