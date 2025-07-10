import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, SelectItem } from '@heroui/react'
import Flag from 'react-world-flags'
import styles from './SwitchLanguage.module.css'
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch'
import useSystemStore from '../../stores/system'
import LoadPage from '../LoadPage/LoadPage'
import { useNavigate } from 'react-router-dom'
import ActionButton from '../../components/ActionButton/ActionButton'
import { motion } from 'framer-motion'

const SwitchLanguage = (): React.ReactElement => {
  const { i18n, t } = useTranslation()
  const [selectedLangCode, setSelectedLangCode] = useState<string | null>(null)
  const { languages } = useSystemStore()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  if (!languages) {
    return <LoadPage />
  }

  const handleChange = async (langCode: string): Promise<void> => {
    try {
      const lang = languages.find((l) => l.key === langCode)
      if (!lang) return

      await i18n.changeLanguage(langCode)
      await window.api.saveConfigValue('language', langCode)
      await window.api.saveConfigValue('userSelectLanguage', true)
      setSelectedLangCode(langCode)
    } catch (error) {
      console.error(error)
    }
  }

  const selectedLang = languages.find((l) => l.key === selectedLangCode)

  const handleNextButton = (): void => {
    setIsLoading(true)
    try {
      navigate('/registration')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className={styles.content}
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>{t('selectYourLanguage')}</h1>

        <Select
          label={t('languageWord')}
          items={languages}
          isDisabled={isLoading}
          selectedKeys={selectedLangCode ? [selectedLangCode] : []}
          placeholder={t('selectLanguage')}
          onSelectionChange={(keys) => handleChange(Array.from(keys)[0] as string)}
          popoverProps={{ className: styles.selectPopover }}
          classNames={{ trigger: styles.trigger }}
        >
          {(lang) => (
            <SelectItem key={lang.key} textValue={lang.label}>
              <div className={styles.selectItem}>
                <Flag code={lang.countryCode} className={styles.flag} />
                <span>{lang.label}</span>
              </div>
            </SelectItem>
          )}
        </Select>

        <div className={styles.selected}>
          {t('selected')}:
          <span className={styles.selectedLang}>
            <Flag code={selectedLang?.countryCode} className={styles.flag} />
            {selectedLang?.label || '-'}
          </span>
        </div>
      </motion.div>

      {selectedLang && (
        <ActionButton onClick={handleNextButton} disabled={isLoading} loading={isLoading} />
      )}

      <ThemeSwitch isFloating />
    </motion.div>
  )
}

export default SwitchLanguage
