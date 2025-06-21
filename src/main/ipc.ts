import { ipcMain, BrowserWindow } from 'electron'
import { getLanguage, setLanguage } from './services/i18n'
import { loadConfig } from './services/config'

export const handleSystemControls = (): void => {
  ipcMain.handle('getConfig', () => loadConfig())
  ipcMain.handle('setLanguage', (_, lang: string) => setLanguage(lang))
  ipcMain.on('getLanguage', () => getLanguage())
}

export const handleWindowControls = (window: BrowserWindow): void => {
  ipcMain.on('windowMinimize', () => window.minimize())
  ipcMain.on('windowMaximize', () =>
    window.isMaximized() ? window.unmaximize() : window.maximize()
  )
  ipcMain.on('windowClose', () => window.close())
}
