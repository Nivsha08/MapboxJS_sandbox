<template>
    <MglMap :accessToken="config.defaultToken"
            :mapStyle.sync="config.baseMap"
            :center.sync="config.center"
            :zoom="config.zoomLevel"
            @load="onMapLoad" >
        <MglNavigationControl position="top-right" />
        <MglGeojsonLayer v-if="!markers"
                         sourceId="vans" :layerId="vansLayerConfig.id"
                         :source="vansSource" :layer="vansLayerConfig" />
        <VansMarkers v-else />
    </MglMap>
</template>

<script lang="ts">
    import Vue from "vue";
    import Mapbox from "mapbox-gl";
    import {MglMap, MglNavigationControl, MglGeojsonLayer} from "vue-mapbox";
    import MapDataManager from "../mapboxMap/MapDataManager";
    import {GeoJSON} from "geojson";
    import VansMarkers from "./VansMarkers.vue";

    const config: any = require("../mapboxMap/config.json");
    const vansLayerConfig: any = require("../mapboxMap/vansLayerConfig.json");

    export default Vue.extend({
        components: {
            MglMap,
            MglNavigationControl,
            MglGeojsonLayer,
            VansMarkers
        },
        props: {
            markers: { type: Boolean, required: true }
        },
        data() {
            return {
                config,
                vansLayerConfig,
                vansSource: null as GeoJSON
            }
        },
        methods: {
            onMapLoad(): void {
                const vansGeoJSON : GeoJSON = MapDataManager.getVansGeoJSON();
                this.vansSource = {
                    type: "geojson",
                    data: vansGeoJSON
                };
            },
        },
        created(): void {
            this.mapbox = Mapbox;
        }
    })
</script>

<style scoped>
    .app-wrapper {
        /*display: flex;*/
        /*flex-direction: column;*/
    }
</style>

