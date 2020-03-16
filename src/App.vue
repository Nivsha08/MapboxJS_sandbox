<template>
    <div id="app">
        <div class="control-wrapper">
            <button @click="markers = !markers">
                <strong>{{ markers ? `Change to GeoJSON layer` : `Change to Markers` }}</strong>
            </button>
            <input type="range" min="0" max="15000" step="1" v-model="numOfPoints" :style="{width: '300px'}">
            <span>{{ numOfPoints }} objects</span>
        </div>
        <Map :markers="markers" :numOfPoints="Number(numOfPoints)" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Map from "./components/Map.vue";

    export default Vue.extend({
        name: 'App',
        components: {
            Map
        },
        data() {
            return {
                markers: false,
                numOfPoints: 100
            }
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
    .control-wrapper {
        display: flex;
        align-items: center;
    }
</style>
