import {Feature, Position, GeoJSON, Point, Polygon} from "geojson";
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
    }

    initializeMap() : void {
        mapboxgl.accessToken = this.token;
        this.map = new mapboxgl.Map({
            container: config.containerElementID,
            style: config.baseMap,
            center: config.center,
            zoom: config.zoomLevel
        });
        this.map.on('load', () => this.renderLayers());
    }

    private renderLayers() : void {
        const collection : GeoJSON = this.createPointsGeoJSON(mock.points);
        const polygon : GeoJSON = this.createPolygonGeoJSON(mock.polygon);
        this.addGeoJSONLayer(polygon, 'ServicePolygon', 'fill', {
            'fill-color': '#000',
            'fill-opacity': 0.15,
            'fill-outline-color': '#000'
        });
        this.addGeoJSONLayer(collection, 'MockPoints', 'circle', {
            'circle-radius': 3,
            'circle-color': '#007da5'
        });
    }

    createPointsGeoJSON(data: LatLng[]) : GeoJSON {
        const points : Point[] = data.map(GeoJSONUtils.createPoint);
        const features : Feature | Feature[] = points.map((p: Point) => GeoJSONUtils.createFeature(p));
        return GeoJSONUtils.createFeatureCollection(features);
    }

    createPolygonGeoJSON(coordinates: Position[][]) : GeoJSON {
        const polygon : Polygon = GeoJSONUtils.createPolygon(coordinates);
        const features : Feature[] = [GeoJSONUtils.createFeature(polygon)];
        return GeoJSONUtils.createFeatureCollection(features);
    }

    addGeoJSONLayer(data: GeoJSON, name: string, layerType: string, paint: any={}, layout: any={}) : void {
        this.map.addSource(name, {
            type: 'geojson',
            data
        });
        this.map.addLayer({
            id: name,
            source: name,
            type: layerType,
            paint,
            layout
        })
    }

}

export default MapManager;