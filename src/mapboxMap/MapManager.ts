import {Feature, FeatureCollection, GeoJSON, Geometry, Point} from "geojson";
import GeoJSONUtils from "../GeoJSONUtils";
import {LatLng} from "../types";
const config : any  = require("./config.json");
const mapboxgl : any = require('mapbox-gl/dist/mapbox-gl.js');
const mock : any = require("../mockData/mockLocations.json");

class MapManager {

    token : string | null = null;
    map : any | null = null;

    constructor(accessToken?: string) {
        this.token = accessToken || config.defaultToken;
        this.initializeMap();
        const collection : GeoJSON = this.createLocationsGeoJSON(mock);
        this.map.on('load', () => this.addGeoJSONLayer(collection, 'MockPoints'));
    }

    initializeMap() : void {
        mapboxgl.accessToken = this.token;
        this.map = new mapboxgl.Map({
            container: config.containerElementID,
            style: config.baseMap,
            center: config.center,
            zoom: config.zoomLevel
        });
    }

    createLocationsGeoJSON(data: LatLng[]) : GeoJSON {
        const points : Point[] = data.map(GeoJSONUtils.createPoint);
        const features : Feature[] = points.map((p: Point) => GeoJSONUtils.createFeature(p));
        return GeoJSONUtils.createFeatureCollection(features);
    }

    addGeoJSONLayer(data: GeoJSON, name: string) : void {
        this.map.addSource(name, {
            type: 'geojson',
            data
        });

        this.map.addLayer({
            id: 'mockPoints',
            source: name,
            type: 'circle',
            paint: {
                'circle-radius': 3,
                'circle-color': '#007da5'
            }
        })
    }

}

export default MapManager;