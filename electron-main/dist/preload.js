"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electron", {
    sendRequest: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    onResponse: (callback) => {
        ipcRenderer.on("response", (event, response) => callback(response));
    },
});
