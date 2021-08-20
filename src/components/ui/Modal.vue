<template>
    <div class="modal">
        <div class="modal__header">
            <div class="modal__title">{{ title }}</div>
            <button class="modal__close" @click="$emit('close')">✖</button>
        </div>
        <div class="modal__body"><slot></slot></div>
        <div class="modal__footer"><slot name="footer"></slot></div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style lang="scss">
.modal {
    background: #333;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 90;
    border: 2px solid grey;
}
.modal__header {
    display: flex;
    color: #ddd;
}
.modal__title {
    flex: 1 0 auto;
    padding: 10px;
}
.modal__body {
    padding: 20px;
}
.modal__close {
    border: none;
    background: none;
    color: rgba(white, 0.5);
    cursor: pointer;
    width: 50px;
    &:hover {
        color: white;
    }
}
.modal__footer {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    button {
        margin-left: auto;
    }
    button + button {
        margin-left: 20px;
    }
}
</style>
