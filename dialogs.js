const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = { showMessage, showSaveDialog, showOpenDialog };

function showMessage(browserWindow) {
  dialog.showMessageBox(browserWindow, {
    type: 'info', // only for windows
    icon: nativeImage.createFromPath('./cat.png'),
    message: 'Hello',
    detail: 'Just a friendly meow.',
    buttons: ['Meow', 'Close'],
    defaultId: 0
  }, (clickedIndex) => {
      global.console.log(clickedIndex);
  });
}

function showSaveDialog(browserWindow) {
  dialog.showSaveDialog(browserWindow, {
    defaultPath: path.join(app.getPath('downloads'), 'memory-info.txt')
  }, (filename) => {
    if (filename) {
      const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
      fs.writeFile(filename, memInfo, 'utf8', (err) => {
        if (err) {
          dialog.showErrorBox('Save failed.', err.message);
        } else {
          dialog.showMessageBox(browserWindow, {
            type: 'info',
            message: 'Success.',
            detail: 'File was saved.'
          })
        }
      })
    }
  });
}

function showOpenDialog(browserWindow) {
  dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath('downloads'),
    filters: [
      {
        name: 'Text Files', // description for windows
        extensions: ['txt']
      }
    ]
  }, (filepath) => {
    if (filepath) {
      global.console.log(filepath, fs.readFileSync(filepath[0], 'utf8'));
    }
  })
}
