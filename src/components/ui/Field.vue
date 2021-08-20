<template>
    <div class="field">
        <label class="field__label">{{ label }}</label>
        <input
            class="field__input"
            v-if="type === 'text'"
            :value="modelValue"
            @change="$emit('change', $event)"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <div class="field__options">
            <div class="field__option" v-for="option in options" :key="option">{{ option }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: { type: String },
        modelValue: { type: [String, Number], required: true },
        type: String,
        options: Array
    }
}
</script>

<style lang="scss">
.field {
    padding: 10px 0;
}
.field__label {
    display: block;
    margin-bottom: 10px;
}
.field__input {
    padding: 10px;
    background: rgba(black, 0.1);
    border: none;
    border-bottom: 2px solid $border-color;
    color: white;
}
</style>
