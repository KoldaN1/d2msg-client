import { BrowserWindow } from 'electron'

/* Fix for frameless+transparent window on Windows */

export const applyWin32TransparentFix = (win: BrowserWindow): void => {
  win.on('blur', () => {
    const [w, h] = win.getSize()
    win.setSize(w, h + 1)
    win.setSize(w, h)
  })

  win.on('focus', () => {
    const [w, h] = win.getSize()
    win.setSize(w, h + 1)
    win.setSize(w, h)
  })
}
