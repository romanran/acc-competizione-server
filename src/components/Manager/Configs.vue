<template>
    <div class="configs">
        <h2 class="configs__title">Configurations:</h2>

        <div class="configs__items">
            <div class="configs__config config" v-for="config in configs" :key="config.id" @click="$emit('change', config)">
                <span class="config__title">{{ config.name }}</span>
                <button class="config__delete" @click="openDeleteModal(config)">✖</button>
            </div>
        </div>

        <button class="configs__add ac-btn" @click="create">Create new config</button>
        <Modal title="Configuration" v-if="modalsOpen.name" @close="modalsOpen.name = false">
            <field label="Configuration name" v-model="newConfigName" type="text" />
            <template #footer>
                <button class="ac-btn" @click="saveNewConfig = true" :disabled="!newConfigName">Ok</button>
            </template>
        </Modal>
        <Modal title="Delete" v-if="modalsOpen.delete" @close="modalsOpen.delete = false">
            <div class="field">
                <label class="field__label"
                    >You are deleting <strong>{{ configToDelete.name }}</strong
                    >. You can't undo this action.</label
                >
            </div>
            <template #footer>
                <button class="ac-btn" @click="closeDeleteModal">Cancel</button>
                <button class="ac-btn" @click="deleteConfig">Delete</button>
            </template>
        </Modal>
    </div>
</template>

<script>
import { random, kebabCase, cloneDeep, findIndex } from 'lodash'
import { ref, watch, nextTick } from 'vue'
import Modal from '@/components/ui/Modal'
import Field from '@/components/ui/Field'

export default {
    components: { Modal, Field },
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
                await window.api.storeDelete({ name: configToDelete.value.id })
                modalsOpen.value.delete = false
            }
        }
    }
}
</script>

<style lang="scss">
$config-height: 40px;
.config {
    display: flex;
    cursor: pointer;
    height: $config-height;
    line-height: $config-height;
    &:hover {
        background: $hover-bg;
    }
}
.configs__title {
    margin: 10px;
}
.configs__items {
    margin-bottom: 20px;
}
.config__title {
    flex: 1 0 auto;
    margin-left: 10px;
}
.config__delete {
    height: inherit;
    width: $config-height;
    border: none;
    background: none;
    cursor: pointer;
    color: white;
    &:hover {
        background: $hover-bg;
    }
}
.configs__add {
    margin: 10px;
    width: calc(100% - 20px);
}
</style>
