"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const url_1 = require("url");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
const constants_1 = require("../shared/constants");
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
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
            preload: (0, path_1.join)(__dirname, "preload.js"),
        },
    });
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.setAlwaysOnTop(true, "floating");
    const url = electron_is_dev_1.default
        ? "http://localhost:8000/"
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, "../renderer/out/index.html"),
            protocol: "file:",
            slashes: true,
        });
    let ignoreMouseEvents = false;
    electron_1.globalShortcut.register("CommandOrControl+i", () => {
        ignoreMouseEvents = !ignoreMouseEvents; // first time clicked would be true
        mainWindow.setIgnoreMouseEvents(ignoreMouseEvents); // make window ignore mouse events
        mainWindow.webContents.send(constants_1.TOGGLE_INTERACTIVE, ignoreMouseEvents); // sending to front end "true"
    });
    electron_1.ipcMain.on(constants_1.CLOSE_WINDOW, () => {
        console.log(constants_1.CLOSE_WINDOW);
        mainWindow.close();
    });
    electron_1.ipcMain.on(constants_1.MINIMIZE, () => {
        console.log(constants_1.MINIMIZE);
        mainWindow.minimize();
    });
    electron_1.ipcMain.on(constants_1.MAXIMIZE, () => {
        console.log(constants_1.MAXIMIZE);
        mainWindow.maximize();
    });
    electron_1.ipcMain.on(constants_1.RESTORE, () => {
        console.log(constants_1.RESTORE);
        mainWindow.unmaximize();
    });
    electron_1.ipcMain.on(constants_1.MAKE_NON_INTERACTIVE, () => {
        console.log(constants_1.MAKE_NON_INTERACTIVE);
        ignoreMouseEvents = true;
        mainWindow.setIgnoreMouseEvents(ignoreMouseEvents);
    });
    mainWindow.loadURL(url);
}
// Prepare the renderer once the app is ready
electron_1.app.on("ready", async () => {
    await (0, electron_next_1.default)("./renderer");
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows.length === 0) {
            createWindow();
        }
    });
});
// Quit the app once all windows are closed
electron_1.app.on("window-all-closed", electron_1.app.quit);
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on("message", (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
