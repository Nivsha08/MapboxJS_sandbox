<template>
    <div>
        <GeojsonLayer v-if="visible" :sourceId="routeConfig.id" :layerId="routeConfig.id" :source="routeSource" :layer="routeConfig" />
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
    import {Feature, LineString, Position} from "geojson";
    import GeoJSONUtils from "../GeoJSONUtils";
    import {GeoJSONLayerSource, LatLng} from "../types";

    const MglComponents: any = require("vue-mapbox");
    const selectedVan: any = require("../mockData/selectedVan.json");
    const routeConfig: any = require("../mockData/config/vanRouteConfig.json");

    export default Vue.extend({
        inject: ["map", "actions"],
        components: {
            MglMarker: MglComponents.MglMarker,
            MglPopup: MglComponents.MglPopup,
            GeojsonLayer: MglComponents.MglGeojsonLayer,
            FontAwesomeIcon
        },
        props: {
            visible: {type: Boolean, default: true}
        },
        data() {
            return {
                selectedVan,
                routeConfig,
                routeSource: null as any
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
            }
        },
        beforeMount(): void {
            this.routeSource = this.constructRouteSource();
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