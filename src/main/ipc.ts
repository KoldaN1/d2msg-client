import { ipcMain, BrowserWindow } from 'electron'
import { loadConfig, saveConfigValue } from './services/config'
import { Config } from '../types/config'

export const handleWindowControls = (window: BrowserWindow): void => {
  ipcMain.on('windowMinimize', () => window.minimize())
  ipcMain.on('windowMaximize', () =>
    window.isMaximized() ? window.unmaximize() : window.maximize()
  )
  ipcMain.on('windowClose', () => window.close())
}

export const handleIpc = (): void => {
  ipcMain.handle('loadConfig', () => loadConfig())
  ipcMain.handle('saveConfigValue', (_, key: keyof Config, value: Config[keyof Config]) =>
    saveConfigValue(key, value)
  )
}
