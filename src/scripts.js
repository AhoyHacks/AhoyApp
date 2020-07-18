//Search for nearby GeoFences
//If none found create a GeoFence
let description ="";
var listOfGeofences;
let chatId = "";
// Radar.trackOnce((err,res) => {
  //   if(!err) {
    //     console.log(result)
    //     Radar.geofences((err,res) => !err ? console.log('Result',res) : console.log('Error',err))
    //   }
    // })

//prj_test_sk_5991f6d94f3dd6564391b67a22a8407d57b1bbd3 

setup();
async function setup(){
  Radar.initialize('prj_test_sk_2f5580d96b2d660cf86a9d9b61b20a9f60263450');
  let latlong=[];
  await Radar.getLocation(async function(err, result) {
    if (!err) {
      latlong.push(result.location.latitude,result.location.longitude);
      let latlongForPost = [result.location.longitude, result.location.latitude];
      console.log('result', result);
      if(latlong.length>0){
        console.log(latlong);
        let result = await findGeofence(latlong);
        console.log("RESULT: "+result);
        if(result==0){
          let data = {
            description: 'SomeName',
            tag: 'venue',
            type: "circle",
            coordinates: latlongForPost, //TODO: Add latlong of user
            radius: 1500
          };
          createGeofence(data);
        }
        else if(result==1){
          await renderer();
          console.log("render over");
          geofenceEntered();
        }
      }
    }
  });
}

async function createGeofence(data){
  console.log('Create Geofence');
  console.log(JSON.stringify(data));
  const response = await fetch(`https://api.radar.io/v1/geofences/`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'prj_test_pk_542a33c10554d93abf97305dfb75d1cb4e976a43'
      },
      body: JSON.stringify(data)
  }); 
  if(response.ok){
      console.log('createGeofence() line:47',await response.json());
  }
  else{
    console.log(await response.json());
  }
  await renderer();
}

async function renderer(){
  console.log("render begun");
  const listGeofenceRes = await fetch('https://api.radar.io/v1/geofences/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'prj_test_sk_2f5580d96b2d660cf86a9d9b61b20a9f60263450'
    }
  })
  if(listGeofenceRes.ok) {
    let data = await listGeofenceRes.json();
    listOfGeofences = data.geofences;
    console.log(listOfGeofences)
    for (let i = 0; i < listOfGeofences.length; i++) {
      let lat = listOfGeofences[i].geometryCenter.coordinates[1];
      let lon = listOfGeofences[i].geometryCenter.coordinates[0];
      addGeofence(lat, lon)
    }

  }
}

async function findGeofence(location){
  console.log('Find Geofence');
  let returnValue = 0;
  let response = await fetch(`https://api.radar.io/v1/search/geofences?near=${location}`, {
      method: 'GET',
      headers: {
      "Authorization": "prj_test_pk_542a33c10554d93abf97305dfb75d1cb4e976a43"
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
      chatId = data.geofences[0]._id;
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
  if(description!="" && chatId!=""){
    console.log(description); //The description of the geofence which can be the title of the chatroom
    document.getElementById("chatId").innerHTML = chatId;//The description of the geofence which can be the title of the chatroom
  }
}