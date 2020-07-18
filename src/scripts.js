//Search for nearby GeoFences
//If none found create a GeoFence

async function setup(){
  Radar.initialize('prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4');
  let latlong=[];
  await Radar.getLocation(function(err, result) {
    if (!err) {
      latlong = [result.location.latitude,result.location.longitude];
      console.log(result);
      if(latlong.length>0){
        console.log(latlong);
        findGeofence(latlong).then(result=>{
          console.log("RESULT: "+result);
          if(result==0){
            
            createGeofence(someName, circle, latlong, 1500);
          }
        });
      }
    }
  });
}

async function createGeofence(store,type,coordinates){
console.log('Create Geofence');
let response = await fetch(`https://api.radar.io/v1/geofences?description=${store}&type=${type}&coordinates=${coordinates}&radius=1500`, {
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
  console.log('Find Geofence');
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
    if(data.geofences.length==0){
      return 0;
    }
    else{
      return 1;
    }
  })
  .catch(e=>{
    return 0;
  })
  ); 
}