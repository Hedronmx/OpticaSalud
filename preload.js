const { shell } = require('electron')
function openwindow(url){
  shell.openExternal(url);
}

console.log("test")
