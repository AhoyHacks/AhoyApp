window.addEventListener("load",setup);
let map;

function setup() {
    navigator.geolocation;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXllY29jbyIsImEiOiJjazk5OTZhb3QxZThyM2lsMmNpMWQzYm4yIn0.0pEJ0qjIhLriirr-BNpUDQ';
    map = new mapboxgl.Map({
        container: 'map',
        style: `mapbox://styles/mapbox/outdoors-v11`,
        zoom: 0,
        center: [27, -37]
    });
    map.addControl(new mapboxgl.NavigationControl());
    Radar.initialize('prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4');
    setInterval(draw,1000);
}


async function draw() {
   let loc = await getLoc();
   console.log(loc);
}


async function getLoc(){
    return await Radar.getLocation((err,result)=>{
        if (err) console.error(err);
        
    });
}
