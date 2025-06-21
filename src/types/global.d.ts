import { Config } from './config'

export {}

declare global {
  interface Window {
    api: {
      windowMaximize: () => void
      windowMinimize: () => void
      windowClose: () => void
      getConfig: () => Promise<Config>
      getLanguage: () => string
      setLanguage: (lang: string) => Promise<void>
    }

    electron: typeof import('@electron-toolkit/preload').electronAPI
  }
}
