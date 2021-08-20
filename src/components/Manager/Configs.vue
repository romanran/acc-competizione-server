<template>
    <div class="configs">
        <div class="configs__items">
            <div class="configs__config config" v-for="config in configs" :key="config.id">
                <span class="config__title">{{ config.name }}</span>
                <button class="config__delete" @click="openDeleteModal(config)">x</button>
            </div>
        </div>

        <button class="configs__add" @click="create">Create new config</button>
        <Modal v-if="modalsOpen.name">
            <div class="field">
                <label class="field__label">Configuration name</label>
                <input v-model="newConfigName" ref="newName" type="text" class="field__input " />
            </div>
            <template #footer>
                <button @click="saveNewConfig = true" :disabled="!newConfigName">Ok</button>
            </template>
        </Modal>
        <Modal v-if="modalsOpen.delete">
            <div class="field">
                <label class="field__label">You are deleting {{ configToDelete.name }}</label>
            </div>
            <template #footer>
                <button @click="closeDeleteModal">Cancel</button>
                <button @click="deleteConfig">Delete</button>
            </template>
        </Modal>
    </div>
</template>

<script>
import { random, kebabCase, cloneDeep, findIndex } from 'lodash'
import { ref, watch, nextTick } from 'vue'
import Modal from '@/components/ui/Modal'

export default {
    components: { Modal },
    setup() {
        const modalsOpen = ref({
            name: false,
            delete: false
        })
        const saveNewConfig = ref(false)
        const newConfigName = ref()
        const configs = ref()
        const newNameRef = ref()
        const configToDelete = ref()

        const getConfigName = async () => {
            await nextTick()
            modalsOpen.value.name = true
            // newName.value.focus()
            return new Promise(resolve => {
                watch(saveNewConfig, newVal => {
                    if (newVal === false) {
                        return
                    }
                    saveNewConfig.value = false
                    resolve()
                })
            })
        }
        async function getConfigs() {
            configs.value = (await window.api.storeGet({ name: 'configs' })) || []
        }

        getConfigs()
        const methods = {
            async create() {
                await getConfigName()
                const id = `config-${kebabCase(newConfigName.value)}-${random(0, 1000)}`
                configs.value.push({
                    name: newConfigName.value,
                    id
                })
                await window.api.storeSet({
                    name: 'configs',
                    value: cloneDeep(configs.value)
                })
                newConfigName.value = ''
                modalsOpen.value.name = false
            }
        }

        return {
            modalsOpen,
            newConfigName,
            saveNewConfig,
            configs,
            newNameRef,
            configToDelete,
            ...methods,
            openDeleteModal(config) {
                modalsOpen.value.delete = true
                configToDelete.value = config
            },
            closeDeleteModal() {
                modalsOpen.value.delete = false
            },
            async deleteConfig() {
                const configIndex = findIndex(newConfigs, configToDelete.value)
                const newConfigs = cloneDeep(configs.value)

                newConfigs.splice(configIndex, 1)
                configs.value = newConfigs

                await window.api.storeSet({
                    name: 'configs',
                    value: newConfigs
                })
                modalsOpen.value.delete = false
            }
        }
    }
}
</script>

<style lang="scss">
.config {
    display: flex;
    cursor: pointer;
    padding: 10px;
}
.config__title {
    flex: 1 0 auto;
}
</style>
