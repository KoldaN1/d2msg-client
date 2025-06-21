import { app, BrowserWindow } from 'electron'
import { setupWindow } from './window'

export const setupLifecycleHooks = (): void => {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      setupWindow()
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}
