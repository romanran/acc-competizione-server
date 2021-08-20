<template>
    <div class="landing">
        <ServerPath v-if="!serverPath" />
        <Manager v-else />
    </div>
</template>

<script>
import Manager from './Manager/Manager.vue'
import ServerPath from './Manager/ServerPath'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'landing-page',
    components: { Manager, ServerPath },
    setup() {
        const store = useStore()
        store.dispatch('main/getServerPath')
        const serverPath = computed(() => store.state.main.serverPath)
        return {
            serverPath
        }
    }
}
</script>

<style lang="scss">
.landing {
    height: 100%;
}
</style>
