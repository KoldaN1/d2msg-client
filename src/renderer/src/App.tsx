import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthForm from './components/AuthForm/AuthForm'
import './assets/main.css'
import { useEffect, useState } from 'react'
import useSystemStore from './stores/system'
import { initI18n } from './i18n'
import { Spinner } from '@heroui/react'

const MainApp: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { setConfig, config } = useSystemStore()

  useEffect(() => {
    const initApp = async (): Promise<void> => {
      try {
        const savedConfig = await window.api.getConfig()
        console.log(savedConfig)
        setConfig(savedConfig)
        await initI18n(savedConfig.language)
      } catch (error) {
        setError((error as Error).message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    initApp()
  }, [setConfig])

  if (isLoading || !config) {
    return (
      <Spinner
        size="lg"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  if (error.length > 0) {
    return <div className="text-red-500 p-4">Ошибка: {error}</div>
  }

  return (
    <BrowserRouter>
      {/* <div className="test" /> */}
      <AuthForm />
      <Routes>
        <Route path="/" element={<div />} />
        {/* <Route path="/auth" element={<div />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default MainApp
