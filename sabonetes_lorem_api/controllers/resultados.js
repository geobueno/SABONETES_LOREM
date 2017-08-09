var ObjectID = require('mongodb').ObjectID;

exports.listar = function (req, res) {
  req.db.collection('resultados').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

    return res.send(result);
  });
};

exports.procurar = function (req, res) {
  var resultado = req.body;

  req.db.collection('resultados').findOne(resultado, function(err, result) {
    if (err) {
      return console.log(err)
    };

    return res.send({texto: result.texto});
  });
};
