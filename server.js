/* Imports */
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let cors = require('cors');
let io = require('socket.io')(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

/* Global vars */
const port = 3000;
const uri = "mongodb+srv://dbUser:nE9c1fTMkb3mdvaA@na-cluester-00.f3dya.mongodb.net/ahoy-db-1?retryWrites=true&w=majority";

/* Buisnes logic */
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors()); // enables cors for requests b/w client and server

server.listen("3000")
// app.listen(port, () => console.log(`App listening at http://localhost:${port}`)) // Server setup


/*
* Get endpoint for the chat messages
*/
app.get('/messages/chat/:recieverId-:senderId', (req, res)=>{
    let response;
    client.connect(async err => {
        if (err) res.status(500).send({error: "oof"})
        const collection = await client.db("AHOY-DB-1").collection("GEOFENCE-ROOMS");
        response = await collection.find({}).toArray();
        res.json(await response);
    });
});


/*
* Post endpoint for the user to add themselves
*/
app.post('/messages/chat/send', (req, res)=>{
    let response;
    client.connect(async err => {
        if (err) res.status(500).send({error: "oof"})
        const collection = await client.db("AHOY-DB-1").collection("GEOFENCE-ROOMS");
        response = await collection.updateOne({"_id":"oof"}, {$push: {"users":"lmao"}});
        res.json(await response);
    });
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg)
    });
  });
