import {LatLng} from "./types";
import {Feature, FeatureCollection, GeoJSON, GeoJsonProperties, Geometry, Point, Polygon, Position} from "geojson";

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

    static createPolygon(coordinatesArray : Position[][]) : Polygon {
        return {
            type: "Polygon",
            coordinates: coordinatesArray
        }
    }

    static createPointsGeoJSON(data: LatLng[]) : GeoJSON {
        const points : Point[] = data.map(GeoJSONUtils.createPoint);
        const features : Feature[] = points.map((p: Point) => GeoJSONUtils.createFeature(p));
        return GeoJSONUtils.createFeatureCollection(features);
    }

}

export default GeoJSONUtils;