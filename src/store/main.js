import { makeMutations } from '@/utilities/store'
import { createNewConfig } from '@/utilities/general'

const initialState = {
    serverPath: '',
    config: null
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
        async loadConfig(context, payload) {
            const config = await window.api.storeGet({ name: payload.id })
            if (!config) {
                context.commit('config', await createNewConfig(payload.id))
            } else {
                context.commit('config', config)
            }
        }
    }
}
