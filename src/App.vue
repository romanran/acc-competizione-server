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
* {
    box-sizing: inherit;
}
html,
body {
    height: 100%;
    background: white;
    box-sizing: border-box;
}
.app {
    height: 100%;
}
.max-height {
    height: 100%;
}
</style>
