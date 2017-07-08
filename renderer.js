const versionEl = document.querySelector('#version');
versionEl.innerText = process.versions.electron;

document.addEventListener("keydown", function (e) {
 if (e.which === 116) {
    location.reload();
  }
});
