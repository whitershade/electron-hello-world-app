const { ipcRenderer } = require('electron');

const versionEl = document.querySelector('#version');
versionEl.innerText = process.versions.electron;

document.addEventListener("keydown", function (e) {
 if (e.which === 116) {
    location.reload();
  }
});

document.querySelector('#create-new-window').addEventListener('click', () => {
  ipcRenderer.send('create-window', {
    x: 0,
    y: 0
  });
});

const countEl = document.querySelector('#count');

ipcRenderer.on('window-count', (event, props) => {
  countEl.textContent = props.count;
});

ipcRenderer.send('get-window-count');
