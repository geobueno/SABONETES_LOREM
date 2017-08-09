// var ObjectID = require('mongodb').ObjectID;
//
// exports.listar = function (req, res){
//   req.db.collection('chat').find().toArray(function (err, result){
//     if (err){
//       return console.log(err)
//     };
//
//     res.send(result);
//   });
// };
//
// exports.criar = function (req, res){
//   req.db.collection('chat').save(req.body, function(err, result){
//     if (err){
//       return res.sendStatus(503);
//     }
//
//     res.sendStatus(201);
//   });
// };
