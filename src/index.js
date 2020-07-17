window.addEventListener("load",setup);

function setup(){
    navigator.geolocation;
    setInterval(draw,1000);
}


function draw(){
    // Radar.initialize('prj_live_pk_20d3fdd8f9d6c1dc196b415ac11a9686b0e36be4');
    Radar.getLocation((err,result)=>{
        if (err) console.error(err);
        else console.log(result)
    });
}