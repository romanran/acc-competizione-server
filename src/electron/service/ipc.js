const Store = require('electron-store')
const { readDir } = require('./browser')
const storage = new Store()
const { ipcMain } = require('electron')

let dirWatcher
const handlers = {
    async storeGet(event, payload) {
        return storage.get(payload.name)
    },
    async storeSet(event, payload) {
        return storage.set(payload.name, payload.value)
    },
    async storeDelete(event, payload) {
        return storage.delete(payload.name)
    },
    async readDir(event, payload) {
        const path = require('path')
        storage.set('cwd', path.normalize(payload.dir))
        const response = await readDir(payload.dir)
        return response
    },
    delete(event, payload) {
        const fs = require('fs-extra')
        payload.paths.forEach(path => {
            fs.remove(path)
        })
    },
    async move(event, payload) {
        const fs = require('fs-extra')
        const path = require('path')

        const moves = payload.paths.map(async filePath => {
            const pathParsed = path.parse(filePath)
            const targetPath = `${payload.targetDir}/${pathParsed.name}${pathParsed.ext}`
            return await fs.move(filePath, targetPath)
        })
        try {
            await Promise.all(moves)
        } catch (err) {
            return err
        }
    },
    async checkServerLocation(event, payload) {
        const fs = require('fs-extra')
        return await fs.pathExists(`${payload.path}/accServer.exe`)
    }
}

module.exports = {
    handlers,
    addIpcHandlers(win) {
        Object.keys(handlers).forEach(key => {
            ipcMain.handle(key, handlers[key])
        })
        ipcMain.handle('watchDir', (event, payload) => {
            const fs = require('fs')
            const { debounce } = require('lodash')
            dirWatcher && dirWatcher.close()
            const watcherCallback = async (a, b) => {
                const paths = await readDir(payload.dir)
                win.webContents.send('dirChange', paths)
            }
            dirWatcher = fs.watch(payload.dir, {}, debounce(watcherCallback, 33))
        })
    }
}
