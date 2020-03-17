<template>
    <GeojsonLayer :sourceId="vansConfig.id" :layerId="vansConfig.id"
                  :source="source" :layer="vansConfig" />
</template>

<script lang="ts">
    import Vue from "vue";
    import {LatLng} from "../types";
    import {Feature, GeoJSON, Point} from "geojson";
    import GeoJSONUtils from "../GeoJSONUtils";
    const MglComponents: any = require("vue-mapbox");
    const vansConfig: any = require("../mapboxMap/vansConfig.json");
    const vansLocations: LatLng[] = require("../mockData/vans.json");

    export default Vue.extend({
        components: {
            GeojsonLayer: MglComponents.MglGeojsonLayer
        },
        data() {
            return {
                vansConfig,
                source: null as any
            }
        },
        beforeMount(): void {
            const points: Point[] = vansLocations.map(GeoJSONUtils.createPoint);
            const features: Feature[] = points.map((p: Point) => GeoJSONUtils.createFeature(p));
            const collection: GeoJSON = GeoJSONUtils.createFeatureCollection(features);
            this.source = {
                type: "geojson",
                data: collection
            };
        }
    });
</script>