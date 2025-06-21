import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HeroUIProvider } from '@heroui/react'
import TitleBar from './components/TitleBar/TitleBar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <div className="d2msg">
        <TitleBar />
        <App />
      </div>
    </HeroUIProvider>
  </StrictMode>
)
