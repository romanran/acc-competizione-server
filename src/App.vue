<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
* {
    box-sizing: inherit;
}
html,
body {
    height: 100%;
    padding: 0;
    margin: 0;
    background: #333;
    color: white;
    box-sizing: border-box;
    font-family: 'Assistant', sans-serif;
}
.app,
#app {
    height: 100%;
}
.max-height {
    height: 100%;
}
.field {
}
.field__label {
}
.field__input {
    display: block;
}
.ac-btn {
    background: none;
    border-radius: 2px;
    border: 2px solid $border-color;
    color: white;
    padding: 10px;
    cursor: pointer;
    &:hover:not(:disabled) {
        background: $hover-bg;
        border-color: white;
    }
    &:disabled {
        color: rgba(white, 0.3);
        cursor: default;
    }
}
</style>
