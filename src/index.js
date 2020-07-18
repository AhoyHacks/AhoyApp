window.addEventListener("load",setup);


function setup() {
    navigator.geolocation;
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