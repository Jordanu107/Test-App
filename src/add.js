this.addEventListener('click', function(event) {
    alert("You clicked on something!");
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.style.backgroundColor = "blue";
});

const electron = require('electron');
alert("2");
const path = require('path');
const remote = electron.remote;
const closeBtn = document.getElementById('closeBtn');

this.getElementById('closeBtn').addEventListener('click', function(event) {
    let window = electron.remote.getCurrentWindow();
    window.close();
});