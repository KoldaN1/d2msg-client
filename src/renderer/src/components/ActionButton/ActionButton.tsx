import { Spinner } from '@heroui/react'
import { FaArrowRight } from 'react-icons/fa'
import styles from './ActionButton.module.css'
import { motion } from 'framer-motion'

interface Props {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

const ActionButton = ({ onClick, disabled, loading }: Props): React.ReactElement => {
  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {loading ? <Spinner size="sm" color="white" /> : <FaArrowRight size={20} />}
    </motion.button>
  )
}

export default ActionButton
