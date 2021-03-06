import {GeoJSON} from "geojson";
import GeoJSONUtils from "../GeoJSONUtils";
const mock : any = require("../mockData/mockLocations.json");

class MapDataManager {

    static getVansGeoJSON(): GeoJSON {
        const vans : GeoJSON = GeoJSONUtils.createPointsGeoJSON(mock.points);
        return vans;
    }

}

export default MapDataManager;