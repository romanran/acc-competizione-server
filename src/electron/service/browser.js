const { saveLog } = require('../utilities/log')

function getDirectoryFiles(dir) {
    const { getFileStats } = require('../utilities/file')
    const glob = require('glob')

    return new Promise((resolve, reject) => {
        glob(`*(!($RECYCLE.BIN))`, { cwd: dir }, async (error, newFiles) => {
            files = await Promise.all(newFiles.map(async file => await getFileStats(file, dir)))
            files = files.filter(file => !!file)
            if (error) {
                reject(error)
            }
            resolve(files)
        })
    })
}

async function readDir(targetDir) {
    const fs = require('fs-extra')
    const path = require('path')
    targetDir = path.normalize(targetDir)
    const previousDir = path.join(targetDir, '..')
    const targetStat = await fs.stat(targetDir)
    const isFile = targetStat.isFile()
    if (isFile) {
        return
    } else {
        // --
        let files, error

        try {
            files = await getDirectoryFiles(targetDir)
        } catch (dirError) {
            error = dirError
            saveLog('ERROR', 'glob-read', dirError)
        }
        return { files, targetDir, previousDir, error }
    }
}

module.exports = {
    readDir
}
