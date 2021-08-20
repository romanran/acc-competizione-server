<template>
    <div class="server-path">
        <label class="server-path__label">Paste server path "...your path...\steamapps\common\Assetto Corsa Competizione Dedicated Server\server"</label>
        <input v-model="serverPath" type="text" class="server-path__input" />
        <div>{{ serverPathError }}</div>
        <button @click="saveServerPath">Submit</button>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'server-path',
    setup() {
        const store = useStore()

        const serverPath = ref(null)
        const serverPathError = ref(null)
        serverPath.value = store.state.main.serverPath

        return {
            serverPath,
            serverPathError,
            async saveServerPath() {
                const hasServer = await window.api.checkServerLocation({ path: serverPath.value })

                if (hasServer) {
                    await window.api.storeSet({ name: 'serverPath', value: serverPath.value })
                } else {
                    serverPathError.value = `Can't find server.exe in the specified path`
                }
            }
        }
    }
}
</script>

<style lang="scss">
.server-path__input {
    display: block;
    width: 500px;
}
</style>
