<template>
    <div>
        <MglMarker v-for="(v, i) in vansCoordinates" :key="i" :coordinates="v">
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
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import MapDataManager from "../mapboxMap/MapDataManager";
    import {Feature, FeatureCollection, Point} from "geojson";

    const MglComponents: any = require("vue-mapbox");
    const config: any = require("../mapboxMap/config.json");

    export default Vue.extend({
        components: {
            MglMarker: MglComponents.MglMarker,
            MglPopup: MglComponents.MglPopup,
            FontAwesomeIcon
        },
        props: {
            numOfPoints: { required: true }
        },
        watch: {
            numOfPoints(): void {
                const vansGeoJSON : FeatureCollection = <FeatureCollection>MapDataManager.getVansGeoJSON();
                this.vansCoordinates = vansGeoJSON.features.map((f: Feature) => (<Point>f.geometry).coordinates)
                    .slice(0, Number(this.numOfPoints));
            }
        },
        data() {
            return {
                config,
                vansCoordinates: null as number[][],
            }
        },
        methods: {
            popupIconClicked(): void {
                alert("popup icon clicked!");
            }
        },
        mounted(): void {
            const vansGeoJSON : FeatureCollection = <FeatureCollection>MapDataManager.getVansGeoJSON();
            this.vansCoordinates = vansGeoJSON.features.map((f: Feature) => (<Point>f.geometry).coordinates)
                .slice(0, Number(this.numOfPoints));
        }
    })
</script>