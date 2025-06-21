import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  windowMaximize: () => ipcRenderer.send('windowMaximize'),
  windowMinimize: () => ipcRenderer.send('windowMinimize'),
  windowClose: () => ipcRenderer.send('windowClose'),
  getConfig: () => ipcRenderer.invoke('getConfig'),
  setLanguage: (lang: string) => ipcRenderer.invoke('setLanguage', lang)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
