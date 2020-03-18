<template>
    <GeojsonLayer v-if="visible" :sourceId="polygonConfig.source" :layerId="polygonConfig.id"
                  :source="source" :layer="polygonConfig" />
</template>

<script lang="ts">
    import Vue from "vue";
    import {Feature, Polygon, Position} from "geojson";
    import GeoJSONUtils from "../GeoJSONUtils";
    const MglComponents: any = require("vue-mapbox");
    const polygonCoordinates: Position[][] = require("../mockData/servicePolygon.json");
    const polygonConfig: any = require("../mockData/config/polygonConfig.json");
    export default Vue.extend({
        components: {
            GeojsonLayer: MglComponents.MglGeojsonLayer
        },
        props: {
            visible: {type: Boolean, default: true}
        },
        data() {
            return {
                polygonConfig,
                source: null as any
            }
        },
        beforeMount(): void {
            const polygon: Polygon = GeoJSONUtils.createPolygon(polygonCoordinates);
            const feature: Feature = GeoJSONUtils.createFeature(polygon);
            this.source = {
                type: "geojson",
                data: feature
            };
        }
    });
</script>