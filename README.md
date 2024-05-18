# Drawing App

## How it build ?


```bash
npm init -y

npm install electron --save-dev

npm install electron-packager --save-dev

npm run package
```

Add code in `package.json`:

```json
"scripts": {
"start": "electron .",
"package": "electron-packager . DrawingApp --platform=win32 --arch=x64 --out=dist",
},
```



## Build App

```bash
npx electron-builder build
```

add code `package.json`:

```json
"build": {
  "appId": "com.example.myapp",
  "productName": "MyApp",
  "directories": {
    "output": "dist"
  },
  "win": {
    "target": "nsis",
    "sign": false
  },
  "mac": {
    "target": "dmg",
    "sign": false
  },
  "linux": {
    "target": "AppImage"
  }
}

}
```
