import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { setupWindow } from './utils/window'
import { setupLifecycleHooks } from './utils/lifecycle'
import { loadConfig } from './services/config'
import { handleIpc } from './ipc'

app.whenReady().then(async () => {
  loadConfig()

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  setupWindow()
  handleIpc()
  setupLifecycleHooks()
})
