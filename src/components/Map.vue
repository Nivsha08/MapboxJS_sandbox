<template>
    <MglMap class="map" :accessToken="config.defaultToken" :mapStyle.sync="config.baseMap"
            :center.sync="config.center" :zoom="config.zoomLevel">
        <LayerController :controller="controller" :toggleLayer="toggleLayer" />
        <NavigationControl position="top-right" />
        <ServicePolygon :visible="controller.servicePolygon" />
        <FilteredVans :visible="controller.filteredVans" />
        <RequestMarkers :visible="controller.requestMarkers" />
        <SelectedVan :visible="controller.selectedVan" />
        <!--<VanTasks :visible="controller.vanTasks" />-->
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
    import SelectedVan from "./SelectedVan.vue";
    import VanTasks from "./VanTasks.vue";

    const config: any = require("../mapboxMap/config.json");

    export default Vue.extend({
        components: {
            MglMap: MglComponents.MglMap,
            NavigationControl: MglComponents.MglNavigationControl,
            LayerController,
            ServicePolygon,
            FilteredVans,
            RequestMarkers,
            SelectedVan,
            VanTasks
        },
        data() {
            return {
                config,
                mapbox: null as any,
                controller: {
                    servicePolygon: true,
                    requestMarkers: true,
                    filteredVans: true,
                    selectedVan: false,
                    vanTasks: false
                } as { [key: string]: boolean }
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

