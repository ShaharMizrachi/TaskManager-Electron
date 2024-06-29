import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
// import url from "url";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
      webSecurity: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../../front/build/index.html"));
  // mainWindow.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

ipcMain.on("create-task", (event, taskHolder) => {
  const { task, status, id } = taskHolder;
  console.log(taskHolder);

  if (!task || !id) {
    event.sender.send("response", { name: "create-task", result: "Task or status is empty", resultStatus: false, status: "empty", id: id, task: task });
  } else {
    event.sender.send("response", { name: "create-task", result: "Task created successfully", resultStatus: true, status: "active", id: id, task: task });
  }
});
