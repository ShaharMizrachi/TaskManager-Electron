const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendRequest: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  onResponse: (callback: (response: any) => void): void => {
    ipcRenderer.on("response", (event, response) => callback(response));
  },
});
