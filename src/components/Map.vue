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
        <VansMarkers v-else :numOfPoints="Number(numOfPoints)" />
    </MglMap>
</template>

<script lang="ts">
    import Vue from "vue";
    const Mapbox: any = require("mapbox-gl");
    const MglComponents: any = require("vue-mapbox");
    import MapDataManager from "../mapboxMap/MapDataManager";
    import {FeatureCollection, GeoJSON} from "geojson";
    import VansMarkers from "./VansMarkers.vue";

    const config: any = require("../mapboxMap/config.json");
    const vansLayerConfig: any = require("../mapboxMap/vansLayerConfig.json");

    export default Vue.extend({
        components: {
            MglMap: MglComponents.MglMap,
            MglNavigationControl: MglComponents.MglNavigationControl,
            MglGeojsonLayer: MglComponents.MglGeojsonLayer,
            VansMarkers
        },
        props: {
            markers: { type: Boolean, required: true },
            numOfPoints: { type:Number, required: true }
        },
        watch: {
            numOfPoints(): void {
                const vansGeoJSON : FeatureCollection = <FeatureCollection>MapDataManager.getVansGeoJSON();
                vansGeoJSON.features = vansGeoJSON.features.slice(0, this.numOfPoints);
                this.vansSource = {
                    type: "geojson",
                    data: vansGeoJSON
                };
            }
        },
        data() {
            return {
                config,
                vansLayerConfig,
                mapbox: null as any,
                vansSource: null as any
            }
        },
        methods: {
            onMapLoad(): void {
                const vansGeoJSON : FeatureCollection = <FeatureCollection>MapDataManager.getVansGeoJSON();
                vansGeoJSON.features = vansGeoJSON.features.slice(0, this.numOfPoints);
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

