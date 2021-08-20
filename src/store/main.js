import { makeMutations } from '@/utilities/store'

const initialState = {
    serverPath: '',
    settings: {}
}
export default {
    state: {
        ...initialState
    },
    namespaced: true,
    mutations: {
        ...makeMutations(initialState)
    },

    actions: {
        async getServerPath(context) {
            const serverPath = await window.api.storeGet({ name: 'serverPath' })
            context.commit('serverPath', serverPath)
        },
        async getSettings(context) {
            const settings = await window.api.readData({ name: 'settings' })
            context.commit('settings', settings)
        }
    }
}
