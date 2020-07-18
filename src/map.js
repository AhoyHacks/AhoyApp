/* @author Adit Garg */

/* Imports */


/* Global variables */
let geojson = {
    "type": "FeatureCollection",
    "features": []
};
let geojsonCorona = {
    "type": "FeatureCollection",
    "features": []
};
let map;

/* Buisnes logic */
// window.addEventListener("load", initMap);
/* initMap()
* Initializes the map with the map itself, markers, and the relevant data
*/
function initMap() {
    let theme = "outdoors";
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXllY29jbyIsImEiOiJjazk5OTZhb3QxZThyM2lsMmNpMWQzYm4yIn0.0pEJ0qjIhLriirr-BNpUDQ';
    map = new mapboxgl.Map({
        container: 'map',
        style: `mapbox://styles/mapbox/${theme}-v11`,
        zoom: 0,
        center: [27, -37]
    });
    map.addControl(new mapboxgl.NavigationControl());
    return Promise.resolve("Success!")
}

// /* changeTheme(theme)
// * Changes the theme of the map
// * @param: theme: "dark" or "light"
// */
// function changeTheme(theme){
//     map.setStyle(`mapbox://styles/mapbox/${theme}-v10`);
// }
