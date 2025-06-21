import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { applyWin32TransparentFix } from './winFix'
import { handleWindowControls } from './ipc'

let mainWindow: BrowserWindow | null = null

export const setupWindow = (): void => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 930,
    height: 600,
    minWidth: 330,
    minHeight: 440,
    transparent: true,
    titleBarStyle: 'hidden',
    frame: false,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  handleWindowControls(mainWindow) // Handle window controls

  if (process.platform === 'win32') {
    // Fix for frameless+transparent window on Windows
    applyWin32TransparentFix(mainWindow)
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
    mainWindow?.setBounds(mainWindow.getBounds())
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
