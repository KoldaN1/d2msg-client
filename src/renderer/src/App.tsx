import { Route, Routes, useNavigate } from 'react-router-dom'
import './assets/main.css'
import { useEffect, useState } from 'react'
import useSystemStore from './stores/system'
import { initI18n } from './i18n'
import LoadPage from './pages/LoadPage/LoadPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import SwitchLanguage from './pages/SwitchLanguage/SwitchLanguage'
import Registration from './pages/Registration/Registration'

const MainApp: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { setConfig, config } = useSystemStore()
  const navigate = useNavigate()

  useEffect(() => {
    const initApp = async (): Promise<void> => {
      try {
        const savedConfig = await window.api.loadConfig()
        setConfig(savedConfig)
        await initI18n(savedConfig.language)

        if (savedConfig.theme === 'dark') {
          document.documentElement.classList.add('dark')
        }

        if (!savedConfig.userSelectLanguage) {
          navigate('/switch-language')
        }

        navigate('/switch-language')
      } catch (error) {
        setError((error as Error).message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    initApp()
  }, [])

  if (isLoading || !config) {
    return <LoadPage />
  }

  if (error.length > 0) {
    return <ErrorPage error={error} />
  }

  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/switch-language" element={<SwitchLanguage />} />
    </Routes>
  )
}

export default MainApp
