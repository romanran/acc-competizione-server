<template>
    <div class="manager">
        <configs class="manager__configs" @change="loadConfig($event)"></configs>
        <div class="manager__body">
            <div class="manager__choose" v-if="!config">
                ← Choose configuration
            </div>
            <template v-else>
                <field
                    v-for="field in settingsFields"
                    :key="field.key"
                    :label="field.label"
                    v-model="config.settings[field.key]"
                    :type="field.type"
                    :options="field.options"
                />
            </template>
        </div>
        <div class="manager__footer"></div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { cloneDeep } from 'lodash'
import { computed, nextTick, ref } from 'vue'
import Configs from './Configs.vue'
import Field from '@/components/ui/Field'
export default {
    components: { Configs, Field },
    setup() {
        const store = useStore()
        const config = ref(null)

        const settingsFields = [
            {
                label: 'Server name',
                key: 'serverName',
                type: 'text'
            },
            {
                label: 'Admin password',
                key: 'adminPassword',
                type: 'text'
            },
            {
                label: 'Server password',
                key: 'password',
                type: 'text'
            }
        ]

        return {
            config,
            settingsFields,
            async loadConfig(loadedConfig) {
                await store.dispatch('main/loadConfig', { id: loadedConfig.id })
                config.value = cloneDeep(store.state.main.config)
            }
        }
    }
}
</script>

<style lang="scss">
.manager {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr 100px;
    gap: 0px 0px;
    grid-template-areas:
        'sidebar content'
        'footer footer';
    height: 100%;
}
.manager__configs {
    height: 100%;
    width: 300px;
    border-right: 2px solid $border-color;
}
.manager__configs {
    grid-area: sidebar;
}
.manager__body {
    grid-area: content;
    padding: 20px;
}
.manager__footer {
    grid-area: footer;
    border-top: 2px solid $border-color;
    width: 100%;
}
</style>
