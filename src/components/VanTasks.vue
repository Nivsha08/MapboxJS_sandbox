<template>
    <GeojsonLayer v-if="visible" :sourceId="tasksConfig.id" :layerId="tasksConfig.id"
                  :source="tasksSource" :layer="tasksConfig" />
</template>

<script lang="ts">
    import Vue from "vue";
    import {Feature, GeoJSON, Point} from "geojson";
    import GeoJSONUtils from "../GeoJSONUtils";
    import {GeoJSONLayerSource, Task} from "../types";

    const MglComponents: any = require("vue-mapbox");
    const selectedVan: any = require("../mockData/selectedVan.json");
    const tasksConfig: any = require("../mockData/config/tasksConfig.json");

    export default Vue.extend({
        inject: ["map", "actions"],
        components: {
            GeojsonLayer: MglComponents.MglGeojsonLayer,
            MglMarker: MglComponents.MglMarker,
            MglPopup: MglComponents.MglPopup
        },
        props: {
            visible: {type: Boolean, default: true}
        },
        data() {
            return {
                selectedVan,
                tasksConfig,
                tasksSource: null as any
            }
        },
        methods: {
            constructTasksSource(): GeoJSONLayerSource {
                const features: Feature[] = selectedVan.tasks.map((p: Task) => {
                    const point: Point = GeoJSONUtils.createPoint({lat: p.lat, lng: p.lng});
                    return GeoJSONUtils.createFeature(point, p);
                });
                const collection: GeoJSON = GeoJSONUtils.createFeatureCollection(features);
                return {
                    type: "geojson",
                    data: collection
                };
            }
        },
        beforeMount(): void {
            this.tasksSource = this.constructTasksSource();
        }
    });
</script>

<style scoped>
</style>