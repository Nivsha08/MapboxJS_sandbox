<template>
    <div>
        <GeojsonLayer :sourceId="routeConfig.id" :layerId="routeConfig.id" :source="routeSource" :layer="routeConfig" />
        <GeojsonLayer :sourceId="tasksConfig.id" :layerId="tasksConfig.id" :source="tasksSource" :layer="tasksConfig" />
        <MglMarker :coordinates="[selectedVan.location.lng, selectedVan.location.lat]">
            <FontAwesomeIcon slot="marker" icon="shuttle-van" :style="{ color: '#00a3ce', fontSize: '.8rem' }" />
            <MglPopup>
                <div class="popup-wrapper">
                    <h2>{{ selectedVan.id }}</h2>
                    <span>{{ selectedVan.type }}</span>
                    <span>{{ selectedVan.proposed ? 'Proposed' : 'Did not proposed' }}</span>
                </div>
            </MglPopup>
        </MglMarker>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import {Feature, GeoJSON, LineString, Point, Position} from "geojson";
    import GeoJSONUtils from "../GeoJSONUtils";
    import {GeoJSONLayerSource, LatLng, Task} from "../types";

    const MglComponents: any = require("vue-mapbox");
    const selectedVan: any = require("../mockData/selectedVan.json");
    const routeConfig: any = require("../mockData/config/vanRouteConfig.json");
    const tasksConfig: any = require("../mockData/config/tasksConfig.json");

    export default Vue.extend({
        inject: ["map", "actions"],
        components: {
            MglMarker: MglComponents.MglMarker,
            MglPopup: MglComponents.MglPopup,
            GeojsonLayer: MglComponents.MglGeojsonLayer,
            FontAwesomeIcon
        },
        data() {
            return {
                selectedVan,
                routeConfig,
                tasksConfig,
                routeSource: null as any,
                tasksSource: null as any
            }
        },
        methods: {
            constructRouteSource(): GeoJSONLayerSource {
                const routeCoordinates: Position[] = selectedVan.route.map((p: LatLng) => [p.lng, p.lat]);
                const lineString: LineString = GeoJSONUtils.createLineString(routeCoordinates);
                const feature: Feature = GeoJSONUtils.createFeature(lineString);
                return {
                    type: "geojson",
                    data: feature,
                    lineMetrics: true
                };
            },
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
            this.routeSource = this.constructRouteSource();
            this.tasksSource = this.constructTasksSource();
        }
    });
</script>

<style scoped>
    .popup-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: .5rem;
    }
    .popup-wrapper h2 {
        margin: 0 0 .3rem 0;
    }
</style>