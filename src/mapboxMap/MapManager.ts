const config : any  = require("./config.json");
const mapboxgl : any = require('mapbox-gl/dist/mapbox-gl.js');

class MapManager {

    token : string | null = null;
    map : object | null = null;

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
    }

}

export default MapManager;