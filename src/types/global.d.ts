import { Config } from './config'

export {}

declare global {
  interface Window {
    api: {
      windowMaximize: () => void
      windowMinimize: () => void
      windowClose: () => void
      loadConfig: () => Promise<Config>
      setLanguage: (lang: string) => Promise<void>
      saveConfigValue: (key: keyof Config, value: Config[keyof Config]) => Promise<void>
    }

    electron: typeof import('@electron-toolkit/preload').electronAPI
  }
}
