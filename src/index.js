const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add.html');
    let win = new BrowserWindow({
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        width: 400,
        height: 200,
        // This line below is SO IMPORTANT
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(modalPath);
    win.on('close', function() {
        win = null;
    });
    win.show();
});