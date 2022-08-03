// Native
import { join } from "path"
import { format } from "url"

// Packages
import {
  BrowserWindow,
  app,
  ipcMain,
  IpcMainEvent,
  globalShortcut,
} from "electron"
import isDev from "electron-is-dev"
import prepareNext from "electron-next"

import {
  CLOSE_WINDOW,
  MINIMIZE,
  MAXIMIZE,
  RESTORE,
  TOGGLE_INTERACTIVE,
  MAKE_NON_INTERACTIVE,
} from "../shared/constants"

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 400,
    minHeight: 400,
    transparent: true,
    frame: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      devTools: true,
      preload: join(__dirname, "preload.js"),
    },
  })
  mainWindow.setIgnoreMouseEvents(false)
  mainWindow.setAlwaysOnTop(true, "floating")

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      })

  let ignoreMouseEvents = false

  globalShortcut.register("CommandOrControl+i", () => {
    ignoreMouseEvents = !ignoreMouseEvents // first time clicked would be true

    mainWindow.setIgnoreMouseEvents(ignoreMouseEvents) // make window ignore mouse events
    mainWindow.webContents.send(TOGGLE_INTERACTIVE, ignoreMouseEvents) // sending to front end "true"
  })

  ipcMain.on(CLOSE_WINDOW, () => {
    console.log(CLOSE_WINDOW)

    mainWindow.close()
  })

  ipcMain.on(MINIMIZE, () => {
    console.log(MINIMIZE)
    mainWindow.minimize()
  })

  ipcMain.on(MAXIMIZE, () => {
    console.log(MAXIMIZE)
    mainWindow.maximize()
  })

  ipcMain.on(RESTORE, () => {
    console.log(RESTORE)
    mainWindow.unmaximize()
  })

  ipcMain.on(MAKE_NON_INTERACTIVE, () => {
    console.log(MAKE_NON_INTERACTIVE)
    ignoreMouseEvents = true
    mainWindow.setIgnoreMouseEvents(ignoreMouseEvents)
  })

  mainWindow.loadURL(url)
}

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer")

  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows.length === 0) {
      createWindow()
    }
  })
})

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send("message", "hi from electron"), 500)
})
