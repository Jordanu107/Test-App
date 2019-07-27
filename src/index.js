const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById('notifyBtn');
let price = document.querySelector('h1');
let targetPrice = document.getElementById('targetPrice');
let targetPriceVal;

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price'
};

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD;
            price.innerHTML = '$' + cryptos.toLocaleString();

            if (targetPriceVal <= res.data.BTC.USD) {
                const myNotification = new window.Notification(notification.title, {body: notification.body});
            }
        });
}

getBTC();
setInterval(getBTC, 10000);

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

ipc.on('targetPriceVal', function(event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = ' $' +  targetPriceVal.toLocaleString();
});