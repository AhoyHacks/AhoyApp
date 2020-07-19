var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message',{
  name : String,
  message : String
})

var dbUrl = 'mongodb+srv://dbUser:nE9c1fTMkb3mdvaA@na-cluester-00.f3dya.mongodb.net/ahoy-db?retryWrites=true&w=majority';

mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
});


app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})


app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save()
      console.log('saved');

    io.emit('message', req.body);
    res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})


io.on('connection', () =>{
  console.log('a user is connected')
})


const MongoClient = require('mongodb').MongoClient;
const uri = dbUrl;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  console.log("MongoDB Connected");

  //THE FOLLOWING CODE IS TO GET INFO FROM THE DB
  const collection = client.db("Ahoy-db").collection("messages");
  var query = { chatId: "5f125b5bbca127004d995827" };
  collection.find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log(result[0].name);
    for(var i=0; i<result.length;i++){ //FOR ALL THE MESSAGES IN THE DATABASE
      let username = result[i].name; //THE USERS NAME
      let message = result[i].message; //THE USERS MESSAGE
    }
  });
  // perform actions on the collection object
  client.close();
});

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});