import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Config } from '../types/config'

const api = {
  windowMaximize: () => ipcRenderer.send('windowMaximize'),
  windowMinimize: () => ipcRenderer.send('windowMinimize'),
  windowClose: () => ipcRenderer.send('windowClose'),
  loadConfig: () => ipcRenderer.invoke('loadConfig'),
  saveConfigValue: (key: keyof Config, value: Config[keyof Config]) =>
    ipcRenderer.invoke('saveConfigValue', key, value)
}

try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
