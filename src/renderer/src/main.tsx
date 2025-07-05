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
        <main className="d2msg dark text-foreground bg-background">
          <TitleBar />
          <App />
        </main>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
)
