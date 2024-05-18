// preload.js

// Import necessary modules from Electron
const { contextBridge, ipcRenderer } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld(
    'api', {
        // Example function to send a message to the main process
        sendMessageToMain: (message) => {
            ipcRenderer.send('messageToMain', message);
        },
        // Example function to receive a message from the main process
        receiveMessageFromMain: (callback) => {
            ipcRenderer.on('messageFromMain', (event, message) => {
                callback(message);
            });
        }
    }
);
