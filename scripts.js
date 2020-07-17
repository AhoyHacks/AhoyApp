
//test function
async function run(){
  let response = await fetch('https://api.radar.io/v1/geocode/ip?ip=107.77.199.117', {
      method: 'GET',
      headers: {
      "Authorization": "prj_test_sk_29e8d67d06e2d5d7a1d75fa07888085e6487c71c"
      },
  }); 
  if(response.ok){
      console.log(await response.json());
  }
}

run();