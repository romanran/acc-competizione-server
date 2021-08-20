export const createNewConfig = async id => {
    const config = require('@/data/config.json')
    await window.api.storeSet({ name: id, value: config })
    return config
}
