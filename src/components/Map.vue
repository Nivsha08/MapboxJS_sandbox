<template>
    <div class="map-container" id="map-container" />
</template>

<script lang="ts">
    import Vue from "vue";
    import MapManager from "../mapboxMap/MapManager";

    export default Vue.extend({
        mounted() : void {
            new MapManager();
        }
    })
</script>

<style scoped>
    .map-container {
        width: 100%;
        height: 100%;
    }
</style>

