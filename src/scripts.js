//Search for nearby GeoFences
//If none found create a GeoFence
let description ="";

async function setup(){
  Radar.initialize('prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4');
  let latlong=[];
  await Radar.getLocation(async function(err, result) {
    if (!err) {
      latlong = `${result.location.latitude},${result.location.longitude}`;
      console.log(result);
      if(latlong.length>0){
        console.log(latlong);
        let result = await findGeofence(latlong);
        console.log("RESULT: "+result);
        if(result==0){
          latlong = `[${result.location.longitude},${result.location.latitude}]`;
          createGeofence("someName", "circle", latlong, 10000);
        }
        else if(result==1){
          geofenceEntered();
        }
      }
    }
  });
}

async function createGeofence(store,type,coordinates){
console.log('Create Geofence');
console.log(`https://api.radar.io/v1/geofences?description=${store}&type=${type}&coordinates=${coordinates}&radius=1500`);
let response = await fetch(`https://api.radar.io/v1/geofences?description=${store}&type=${type}&coordinates=${coordinates}&radius=1500`, {
    method: 'POST',
    headers: {
    "Authorization": "prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4"
    },
}); 
if(response.ok){
    console.log(await response.json());
}
}

async function findGeofence(location){
  console.log('Find Geofence');
  let returnValue = 0;
  let response = await fetch(`https://api.radar.io/v1/search/geofences?near=${location}`, {
      method: 'GET',
      headers: {
      "Authorization": "prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4"
      },    
  }
  ).then(response => response.json()
  .then(data =>{
    console.log(data);
    console.log(data.geofences);
    console.log(data.geofences.length==0);
    if(data.geofences.length==0){
      returnValue=0;
    }
    else{
      description = data.geofences[0].description;
      returnValue=1;
    }
  })
  .catch(e=>{
    returnValue=0;
  })
  ); 
  return returnValue;
}

function geofenceEntered(){ //TODO: Log the user into a chat room
  console.log('geofence Entered');
  console.log(description); //The description of the geofence which can be the title of the chatroom
}