// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var mongoose = require('mongoose');

// app.use(express.static(__dirname));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}))

// var Message = mongoose.model('Message',{
//   name : String,
//   message : String
// })
// //
// var dbUrl = 'mongodb+srv://dbUser:3oHtXm26UmirXxgM@na-cluester-00.f3dya.mongodb.net/Ahoy-db?retryWrites=true&w=majority'

// app.get('/messages', (req, res) => {
//   Message.find({},(err, messages)=> {
//     res.send(messages);
//   })
// })


// app.get('/messages/:user', (req, res) => {
//   var user = req.params.user
//   Message.find({name: user},(err, messages)=> {
//     res.send(messages);
//   })
// })


// app.post('/messages', async (req, res) => {
//   console.log(req.body);
//   try{
//     var message = new Message(req.body);

//     var savedMessage = await message.save()
//       console.log('saved');

//     var censored = await Message.findOne({message:'badword'});
//       if(censored)
//         await Message.remove({_id: censored.id})
//       else
//         io.emit('message', req.body);
//       res.sendStatus(200);
//   }
//   catch (error){
//     res.sendStatus(500);
//     return console.log('error',error);
//   }
//   finally{
//     console.log('Message Posted')
//   }

// })



// io.on('connection', () =>{
//   console.log('a user is connected')
// })

// /* mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
//   console.log('mongodb connected',err);
// })
//  */
// var server = http.listen(3000, () => {
//   console.log('server is running on port', server.address().port);
// });

// mongoose.connect(dbUrl, function(err, db) {
//   collectionName='5f125b5bbca127004d995827';
//   db.listCollections().toArray(function(err, collections) {
//       var collectionExists = false;
//       console.log(JSON.stringify(err,null,1));
//       if(!err && collections && collections.length>0){
//           _.each(collections,function (co) {
//               console.log(JSON.stringify(co.name,null,1));
//               if(co.name == collectionName){
//                   collectionExists = true;
//               }
//           })
//       }

//       if(!collectionExists){
//           db.createCollection(collectionName, function(err, collection) {

//           })
//       }
//       db.close();
//   });
// })