import React, { useState } from 'react'
import { Form, Input, Button, Spinner } from '@heroui/react'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import styles from './Registration.module.css'
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Registration = (): React.ReactElement => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const passwordErrors: string[] = []

  if (password.length < 8) {
    passwordErrors.push(t('passwordMinLength'))
  }
  if ((password.match(/[A-Z]/g) || []).length < 1) {
    passwordErrors.push(t('passwordUppercase'))
  }
  if ((password.match(/[^a-z0-9]/gi) || []).length < 1) {
    passwordErrors.push(t('passwordSymbol'))
  }
  if (password !== repeatPassword && repeatPassword.length > 0) {
    passwordErrors.push(t('passwordsDontMatch'))
  }

  const isFormValid =
    username.trim().length > 0 &&
    email.trim().length > 0 &&
    passwordErrors.length === 0 &&
    repeatPassword.length > 0

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)
    const data = { username, email, password }
    setTimeout(() => {
      setIsLoading(false)
      alert(JSON.stringify(data))
    }, 900)
  }

  const eyeButton = (
    <span
      role="button"
      tabIndex={0}
      onClick={() => setShowPassword(!showPassword)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setShowPassword(!showPassword)
        }
      }}
      className={styles.eyeIcon}
      aria-label={showPassword ? t('hidePassword') : t('showPassword')}
    >
      {!showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  )

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>{t('registerTitle')}</h1>

        <Input
          placeholder={t('usernamePlaceholder')}
          name="username"
          isRequired
          startContent={<FaUser className={styles.icon} />}
          disabled={isLoading}
          value={username}
          onValueChange={setUsername}
        />

        <Input
          placeholder={t('emailPlaceholder')}
          name="email"
          type="email"
          isRequired
          startContent={<FaEnvelope className={styles.icon} />}
          disabled={isLoading}
          value={email}
          onValueChange={setEmail}
          errorMessage={t('invalidEmail')}
          isInvalid={email.length > 0 && !email.includes('@')}
        />

        <Input
          placeholder={t('passwordPlaceholder')}
          name="password"
          type={showPassword ? 'text' : 'password'}
          isRequired
          startContent={<FaLock className={styles.icon} />}
          endContent={eyeButton}
          disabled={isLoading}
          value={password}
          onValueChange={setPassword}
          isInvalid={password.length > 0 && passwordErrors.length > 0}
          errorMessage={() => (
            <ul>
              {passwordErrors.slice(0, 2).map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          )}
        />

        <Input
          placeholder={t('repeatPasswordPlaceholder')}
          name="repeatPassword"
          type={showPassword ? 'text' : 'password'}
          isRequired
          startContent={<FaLock className={styles.icon} />}
          endContent={eyeButton}
          disabled={isLoading}
          value={repeatPassword}
          onValueChange={setRepeatPassword}
          isInvalid={password.length > 0 && passwordErrors.length > 0}
        />

        <Button
          type="submit"
          variant="solid"
          isDisabled={!isFormValid || isLoading}
          className={styles.submitButton}
        >
          {isLoading ? <Spinner size="sm" color="white" /> : t('register')}
        </Button>

        <span className={styles.link} onClick={() => navigate('/auth')}>
          {t('alreadyHaveAccount')}
        </span>
      </Form>

      <ThemeSwitch isFloating />
    </motion.div>
  )
}

export default Registration
