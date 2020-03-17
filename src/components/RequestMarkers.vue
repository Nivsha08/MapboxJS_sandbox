<template>
    <div>
        <GeojsonLayer :sourceId="requestMarkersConfig.id" :layerId="requestMarkersConfig.id"
                      :source="source" :layer="requestMarkersConfig" />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {LatLng} from "../types";
    import {Feature, GeoJSON, Point} from "geojson";
    import GeoJSONUtils from "../GeoJSONUtils";
    const MglComponents: any = require("vue-mapbox");
    const requestMarkersConfig: any = require("../mockData/config/requestMarkersConfig.json");
    const requestMarkers: LatLng[] = require("../mockData/requestMarkers.json");

    export default Vue.extend({
        components: {
            GeojsonLayer: MglComponents.MglGeojsonLayer
        },
        data() {
            return {
                requestMarkersConfig,
                source: null as any
            }
        },
        beforeMount(): void {
            const features: Feature[] = requestMarkers.map((p: {lat: number, lng: number, type: string}) => {
                const geometry: Point = GeoJSONUtils.createPoint({lat: p.lat, lng: p.lng});
                return GeoJSONUtils.createFeature(geometry, {type: p.type});
            });
            const collection: GeoJSON = GeoJSONUtils.createFeatureCollection(features);
            this.source = {
                type: "geojson",
                data: collection
            };
        }
    });
</script>