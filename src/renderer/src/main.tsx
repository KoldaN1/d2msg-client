import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HeroUIProvider } from '@heroui/react'
import TitleBar from './components/TitleBar/TitleBar'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <div className="d2msg">
          <TitleBar />
          <App />
        </div>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
)
