import { Spinner } from '@heroui/react'
import styles from './LoadPage.module.css'

const LoadPage = (): React.ReactElement => {
  return (
    <div className={styles.loadPage}>
      <Spinner size="lg" />
    </div>
  )
}

export default LoadPage
