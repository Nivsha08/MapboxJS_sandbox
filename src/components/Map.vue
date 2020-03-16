<template>
    <MglMap :accessToken="config.defaultToken"
            :mapStyle.sync="config.baseMap"
            :center.sync="config.center"
            :zoom="config.zoomLevel"
            @load="onMapLoad" >
        <MglNavigationControl position="top-right" />
        <MglMarker v-for="(v, i) in vans" :key="i" :coordinates="v">
            <FontAwesomeIcon slot="marker" icon="shuttle-van" :style="{ color: '#007da5' }" />
            <MglPopup>
                <div>
                    <h2>{{ v[0] }}</h2>
                    <p>this is the popup text!</p>
                    <p>custom popup template!</p>
                    <FontAwesomeIcon icon="shuttle-van" :style="{color: 'blue'}" @click="popupIconClicked"/>
                </div>
            </MglPopup>
        </MglMarker>
    </MglMap>
</template>

<script lang="ts">
    import Vue from "vue";
    import Mapbox from "mapbox-gl";
    import {MglMap, MglNavigationControl, MglMarker, MglPopup} from "vue-mapbox";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import MapDataManager from "../mapboxMap/MapDataManager";
    import {Feature, FeatureCollection, Point} from "geojson";
    const config: any = require("../mapboxMap/config.json");

    export default Vue.extend({
        components: {
            MglMap,
            MglNavigationControl,
            MglMarker,
            MglPopup,
            FontAwesomeIcon
        },
        data() {
            return {
                config,
                vans: null as number[][]
            }
        },
        methods: {
            onMapLoad(): void {
                const vansGeoJSON : FeatureCollection = <FeatureCollection>MapDataManager.getVansGeoJSON();
                this.vans = vansGeoJSON.features.map((f: Feature) => (<Point>f.geometry).coordinates);
            },
            popupIconClicked(): void {
                alert("popup icon clicked!");
            }
        },
        created(): void {
            this.mapbox = Mapbox;
        }
    })
</script>

<style scoped>
</style>

