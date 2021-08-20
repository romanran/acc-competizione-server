function getDisplayStats(stats) {
    const { format } = require('date-fns')

    return {
        time: format(stats.mtime, 'yyyy/MM/dd HH:mm')
    }
}

module.exports = {
    async getFileStats(file, currentDir) {
        if (file === '../') {
            return {
                type: ''
            }
        }
        const path = require('path')
        const fs = require('fs-extra')
        const { clone } = require('lodash')
        const fullPath = path.resolve(currentDir, file)
        try {
            const data = await fs.stat(fullPath)
            const dataStats = clone(data)
            dataStats.mtime = data.mtime.getTime()
            dataStats.atime = data.atime.getTime()
            dataStats.ctime = data.ctime.getTime()
            let type = 'folder'
            if (!data.isDirectory()) {
                type = 'file'
            }
            return {
                type,
                name: file,
                data: dataStats,
                fullPath: path.normalize(fullPath),
                display: getDisplayStats(data)
            }
        } catch (err) {
            console.warn(err)
            return null
        }
    },
    getDisplayStats,
    renameDir(file) {
        console.log(file)
    }
}
