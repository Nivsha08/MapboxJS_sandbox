<template>
    <MglMap class="map" :accessToken="config.defaultToken" :mapStyle.sync="config.baseMap"
            :center.sync="config.center" :zoom="config.zoomLevel">
        <LayerController :controller="controller" :toggleLayer="toggleLayer" />
        <NavigationControl position="top-right" />
        <FullScreenButton />
        <ServicePolygon v-if="controller.servicePolygon" />
        <FilteredVans v-if="controller.filteredVans" />
        <RequestMarkers v-if="controller.requestMarkers" />
    </MglMap>
</template>

<script lang="ts">
    import Vue from "vue";
    const Mapbox: any = require("mapbox-gl");
    const MglComponents: any = require("vue-mapbox");
    import ServicePolygon from "./ServicePolygon.vue";
    import FilteredVans from "./FilteredVans.vue";
    import RequestMarkers from "./RequestMarkers.vue";
    import LayerController from "./LayerController.vue";

    const config: any = require("../mapboxMap/config.json");

    export default Vue.extend({
        components: {
            MglMap: MglComponents.MglMap,
            NavigationControl: MglComponents.MglNavigationControl,
            FullScreenButton: MglComponents.MglFullscreenControl,
            LayerController,
            ServicePolygon,
            FilteredVans,
            RequestMarkers
        },
        data() {
            return {
                config,
                mapbox: null as any,
                controller: {
                    servicePolygon: true,
                    requestMarkers: true,
                    filteredVans: true
                }
            }
        },
        methods: {
            toggleLayer(layerName: string): void {
                if (this.controller.hasOwnProperty(layerName)) {
                    this.controller[layerName] = !this.controller[layerName];
                }
            }
        },
        created(): void {
            this.mapbox = Mapbox;
        }
    })
</script>

<style scoped>
    .map {
        position: relative;
    }
</style>

