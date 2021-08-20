const electronFiles = 'service/browser.js, service/ipc.js, utilities/file.js,'
module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/electron/preload.js',
            mainProcessWatch: electronFiles.split(', ').map(file => `src/electron/${file}`),
            mainProcessFile: 'src/electron/background.js',
            builderOptions: {
                appId: 'com.accc-server-manager.app',
                productName: 'accc-server-manager',
                win: {
                    icon: 'public/server.ico'
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/scss/variables.scss";`
            }
        }
    }
}
