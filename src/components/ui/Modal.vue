<template>
    <div class="modal">
        <div class="modal__body"><slot></slot></div>
        <div class="modal__footer"><slot name="footer"></slot></div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.modal {
    background: #333;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    z-index: 90;
    border: 2px solid grey;
    padding: 20px;
}
.modal__footer {
    margin-top: 20px;
}
</style>
