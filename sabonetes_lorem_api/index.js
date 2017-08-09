var express = require('express');
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');
var resultadosController = require('./controllers/resultados.js');
var mensagensController = require('./controllers/mensagens.js');
const apiaiApp = require('apiai')('31ccd7837ee0483cad5c3b33bbd26b92');

// inicializa o express
var app = express();

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://172.16.15.143:27017/lorem'));


//libera o acesso a API a patir de  qualquer cliente, host, etc....
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// endpoints formulario
app.get('/resultados', resultadosController.listar);
app.post('/resultados', resultadosController.procurar);

app.post('/chamar2', function (req, res) {

var result = req.body
console.log(result.enviando)
console.log(result.usuario)
// result = JSON.parse(result)
// console.log(result)

    // Assume all went well.
    //
    function sendMessage(senderID, messageText,timeOfMessage) {
    let sender = senderID;
    let text =  messageText;

    let apiai = apiaiApp.textRequest(text, {
      sessionId: sender // use any arbitrary id
    });
    apiai.on('response', (response) => {
    // Got a response from api.ai. Let's POST to Facebook Messenger
    // console.log(response)
    //console.log(response.result.fulfillment.speech  )
    let apiaiText = response.result.fulfillment.speech
console.log("aquiiii resposta")
console.log(apiaiText)
console.log("aquiiii")
     res.send(apiaiText ) // #### Aqui vai sua resposta pro ionic !!!!!!!!! que ele pediu

    });
    apiai.on('error', (error) => {
      console.log(error);
    });

    apiai.end();
  }


   var senderID = result.usuario
   var messageText = result.enviando
   var timeOfMessage = " time"
   sendMessage(senderID, messageText,timeOfMessage)

});


// endpoints mensagens
// app.get('/chat', mensagensController.listar);
// app.post('/chat', mensagensController.criar);


// inicializa o servidor na porta especificada
app.listen(3000, "0.0.0.0", function() {
  console.log('Acesse o servidor http://172.16.15.143:3000');
});
