import styles from './ErrorPage.module.css'
import { useTranslation } from 'react-i18next'

interface ErrorPageProps {
  error: string
}

const ErrorPage = ({ error }: ErrorPageProps): React.ReactElement => {
  const { t } = useTranslation()
  return <div className={styles.errorPage}>{t('error', { error })}</div>
}

export default ErrorPage
