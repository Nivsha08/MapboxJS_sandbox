import {GeoJSON} from "geojson";

export interface LatLng {
    lat: number,
    lng: number
}

export interface GeoJSONLayerSource {
    type: "geojson",
    data: GeoJSON,
    [key: string]: any
}

export interface Task {
    task_type: "wait" | "dropoff" | "pickup",
    lat: number,
    lng: number,
    van_id: number,
    city_id: number,
    eta: number,
    event_type: string,
    [key: string]: any
}