//Search for nearby GeoFences
//If none found create a GeoFence

async function setup() {
    Radar.initialize('prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4');
    let latlong = [];
    await Radar.getLocation(function (err, result) {
        if (!err) {
            latlong = [result.location.latitude, result.location.longitude];
            console.log(result);
        }
    });
    if (latlong.length > 0) {
        console.log(latlong);
        const location = {
            near: latlong
        };
        let result = await findGeofence(location);
        if (result === 0) {
            const data = {
                description: SomeName,
                type: circle,
                coordinates: latlong, //TODO: Add latlong of user
                radius: 1500, //1.5km around ship
            }
            await createGeofence(data);
        }
    }
    //setInterval(draw,1000);
}

async function createGeofence(data) {
    let response = await fetch('https://api.radar.io/v1/geofences', {
        method: 'POST',
        headers: {
            "Authorization": "prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4"
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        console.log(await response.json());
    }
}

async function findGeofence(location) {
    console.log('Find Geofence');
    let response = await fetch('https://api.radar.io/v1/search/geofences', {
        method: 'GET',
        headers: {
            "Authorization": "prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4"
        },
        body: JSON.stringify(location)

    });
    if (response.ok) {
        console.log(await response.json());
    } else {
        return 0;
    }
}