import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { setupWindow } from './window'
import { setupLifecycleHooks } from './lifecycle'
import { initI18n } from './services/i18n'
import { loadConfig } from './services/config'
import { handleSystemControls } from './ipc'

app.whenReady().then(async () => {
  const config = loadConfig()
  await initI18n(config.language)

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  setupWindow()
  handleSystemControls()
  setupLifecycleHooks()
})
