<template>
    <div id="app">
        <Map />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Map from "./components/Map.vue";

    export default Vue.extend({
        name: 'App',
        components: {
            Map
        }
    });
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    html {
        height: 100%;
    }
    body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
</style>
