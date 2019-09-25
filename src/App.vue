<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="less">
body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
}
#app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
