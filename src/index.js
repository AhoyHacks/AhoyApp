function moveMap(map) {
    map.setCenter({
        lat: 0,
        lng: 0
    });
    map.setZoom(1);
}


window.addEventListener("load",setup);
function setup(){
    let message = document.querySelector("#message");
    message.addEventListener('keyup', () =>{
        console.log( message.value.length)
        message.setAttribute('rows', message.value.split('\n').length);
    });
}

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
    apikey: 'rPLmpaVOXfwYSmbAES161lsdLrrXhGpucEB527Or9W0'
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map, {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
    });
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
    moveMap(map);
}

function addGeofence(latitude, longitude) {
    console.log('Add Geofence');
    var bubble = new H.ui.InfoBubble({
        lng: longitude,
        lat: latitude
    }, {
        content: '<b>Ahoy There!</b>'
    });
    ui.addBubble(bubble);

    var circle = new H.map.Circle({
        lat: latitude,
        lng: longitude
    }, 1500);
    map.addObject(circle);
}
