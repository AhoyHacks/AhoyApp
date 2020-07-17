//Search for nearby GeoFences
//If none found create a GeoFence


function run(){
  const location = { 'near': '[latitude, longitude]'} //TODO: Add latlong of user
  let result = findGeofence(location);
  if(result===0){
    const data = {
      'description': 'SomeName',
      'type': 'circle',
      'coordinates': '[lat,long]', //TODO: Add latlong of user
      'radius': '1500', //1.5km around ship
    }
    createGeofence(data);
  }
}

async function createGeofence(data){
  let response = await fetch('https://api.radar.io/v1/geofences', {
      method: 'POST',
      headers: {
      "Authorization": "prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4"
      },
      body: JSON.stringify(data)
  }); 
  if(response.ok){
      console.log(await response.json());
  }
}

async function findGeofence(location){
  let response = await fetch('https://api.radar.io/v1/search/geofences', {
      method: 'GET',
      headers: {
      "Authorization": "prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4"
      },
      body: JSON.stringify(location)
      
  }); 
  if(response.ok){
    console.log(await response.json());
  }else{
    return 0;
  }
}

run();