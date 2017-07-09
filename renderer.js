const { ipcRenderer, remote } = require('electron');
const path = require('path');
require('devtron').install();
const currentWindow = remote.getCurrentWindow();

const versionEl = document.querySelector('#version');
versionEl.innerText = process.versions.electron;

document.addEventListener("keydown", function (e) {
 if (e.which === 116) {
    location.reload();
  }
});

// document.querySelector('#create-new-window').addEventListener('click', () => {
//   ipcRenderer.send('create-window', {
//     x: 0,
//     y: 0
//   });
// });

document.querySelector('#create-new-window').addEventListener('click', () => {
  const win = new remote.BrowserWindow({
    height: 400,
    width: 400
  });
  win.loadURL(path.join('file://', __dirname, 'index.html'));
});

const countEl = document.querySelector('#count');

ipcRenderer.on('window-count', (event, props) => {
  countEl.textContent = props.count;
});

ipcRenderer.send('get-window-count');

function onBlur() {
  document.body.style = 'opacity: 0.2';
}

function onFocus() {
  document.body.style = 'opacity: 1';
}

currentWindow.on('blur', onBlur);
currentWindow.on('focus', onFocus);


window.addEventListener('beforeunload', () => {
    currentWindow.removeListener('blur', onBlur);
    currentWindow.removeListener('focus', onFocus);
});
