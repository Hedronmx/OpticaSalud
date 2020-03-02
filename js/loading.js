const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = require('electron').ipcMain

// Or use `remote` from the renderer process.
// const { BrowserWindow } = require('electron').remote
win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      plugins: true,
      preload: 'pdf.js'
    }
  })

win.loadURL(`file://${__dirname}/index.html`)

ipc.send('close')



// window.open('index.html',"Optica Zeiss", "nodeIntegration=no" );
