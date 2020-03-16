<template>
    <MglMap :accessToken="config.defaultToken"
            :mapStyle.sync="config.baseMap"
            :center.sync="config.center"
            :zoom="config.zoomLevel"
            @load="onMapLoad" >
        <MglNavigationControl position="top-right" />
        <MglMarker :coordinates="markerCoordinates" />
    </MglMap>
</template>

<script lang="ts">
    import Vue from "vue";
    import Mapbox from "mapbox-gl";
    import {MglMap, MglNavigationControl, MglMarker} from "vue-mapbox";
    const config: any = require("../mapboxMap/config.json");

    export default Vue.extend({
        components: {
            MglMap,
            MglNavigationControl,
            MglMarker
        },
        data() {
            return {
                config,
                markerCoordinates: [34.789675, 32.086872]
            }
        },
        methods: {
            onMapLoad(): void {

            }
        },
        created(): void {
            this.mapbox = Mapbox;
        }
    })
</script>

<style scoped>
</style>

