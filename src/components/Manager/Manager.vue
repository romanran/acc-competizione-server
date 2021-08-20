<template>
    <div class="manager">
        <configs class="manager__configs"></configs>
        <div class="manager__body">
            <div class="manager__server-name">
                <input v-model="serverName" class="manager__server-name-input" />
            </div>
            <div class="manager__tracks">
                TRACKS:
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Configs from './Configs.vue'
export default {
    components: { Configs },
    setup() {
        const store = useStore()
        return {
            serverName: ''
        }
    }
}
</script>

<style lang="scss">
.manager {
    display: flex;
    height: 100%;
}
.manager__configs {
    height: 100%;
    width: 300px;
    border-right: 2px solid $border-color;
}
</style>
