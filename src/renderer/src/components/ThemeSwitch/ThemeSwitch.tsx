import styles from './ThemeSwitch.module.css'
import { FaMoon, FaSun } from 'react-icons/fa'
import { VisuallyHidden, useSwitch } from '@heroui/react'
import { useEffect } from 'react'
import useSystemStore from '../../stores/system'

interface ThemeSwitchProps {
  isFloating?: boolean
}

const ThemeSwitch = ({ isFloating }: ThemeSwitchProps): React.ReactElement => {
  const { config } = useSystemStore()

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    defaultSelected: config?.theme === 'dark'
  })

  useEffect(() => {
    if (isSelected) {
      document.documentElement.classList.add('dark')
      window.api.saveConfigValue('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      window.api.saveConfigValue('theme', 'light')
    }
  }, [isSelected])

  return (
    <div className={`${isFloating ? styles.switcherFloating : ''}`}>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              'w-8 h-8',
              'flex items-center justify-center',
              'rounded-lg',
              'cursor-pointer',
              '!bg-[var(--font)]',
              'hover:!bg-[var(--font-secondary)]'
            ]
          })}
        >
          {isSelected ? <FaSun color="#000000" /> : <FaMoon color="#ffffff" />}
        </div>
      </Component>
    </div>
  )
}

export default ThemeSwitch
