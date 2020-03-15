## MapboxJS sandbox

##### Recreation steps:
1. Vue w/ TypeScript using SFCs. `tsconfig.json`:
    ```json
    {
       "compilerOptions": {
           "module": "ES6",
           "noImplicitAny": true,
           "noImplicitThis": true,
           "noImplicitReturns": true,
           "sourceMap": true,
           "moduleResolution": "node",
           "resolveJsonModule": true  
       },
       "paths": {
           "@/*": [
           "src/*"
           ]
       },
       "include": [
           "src/**/*.ts",
           "src/**/*.vue"
       ],
       "files": [
           "src/vue-shims.d.ts"
       ],
       "exclude": [
           "node_modules"
       ]  
    }
    ```

2. Including MapboxJS:  
    ```
    npm install mapbox-gl --save
    ```   
    add this to `index.html`:   
    ```
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />
    ```

3. Initialize basic map configuration: `config.json`
    ```json
    {
        "defaultToken": "ACCESS_TOKEN",
        "containerElementID": "HTML_CONTAINER_ELEMENT_ID",
        "baseMap": "BASE_MAP_URL",
        "center": {
            "lat": 32.074815,
            "lng": 34.779446
        },
        "zoomLevel": 13
    }
    ``` 
    
4. Initialize the Map container with this JS code:
    ```typescript
    const config : any  = require("./config.json");
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    
    mapboxgl.accessToken = config.token;
    const map = new mapboxgl.Map({
        container: config.containerElementID,
        style: config.baseMap,
        center: config.center,
        zoom: config.zoomLevel
    });
    ```

5. Given a data JSON `mock`, create a GeoJSON FeatureCollection. Add a source to the MapBox map object, 
then create a new layer and link it to that source:
    ```typescript
    this.map.on('load', () => this.addGeoJSONLayer(collection, 'MockPoints'));
    
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
        });
    }
    ``` 
    Where:
    * the `source` property refers to the source name.
    * the `type` property refers to the created marker type ('circle', 'symbol', etc). 
    * the `paint` property refers to MapBox style props. 