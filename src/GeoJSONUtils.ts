import {LatLng} from "./types";
import {Feature, FeatureCollection, GeoJsonProperties, Geometry, Point} from "geojson";

class GeoJSONUtils {

    static createPoint(point: LatLng) : Point {
        return {
            type: "Point",
            coordinates: [point.lng, point.lat]
        };
    }

    static createFeature(geometry: Geometry, properties: GeoJsonProperties={}, id?: string | number) : Feature {
        return {
            type: "Feature",
            geometry,
            properties,
            id
        }
    }

    static createFeatureCollection(features: Feature[]) : FeatureCollection {
        return {
            type: "FeatureCollection",
            features: features
        }
    }

}

export default GeoJSONUtils;