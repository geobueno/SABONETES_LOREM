angular.module('starter.controllers', ['starter.services'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('FacaOSeuCtrl', function($rootScope, $scope, $state, FacaOSeuService, $http) {

  $scope.peles = ['normal', 'mista', 'oleosa', 'seca'];

  $scope.beneficios = ['hidratação', 'anti-acne', 'rejuvenescimento', 'redução de pelos', 'esfoliação', 'clarear manchas'];

  $scope.resultado = {
    peles : null,
    beneficios : null
      };

  $scope.enviar = function(){
    $http.post('http://198.199.88.217:3000/resultados', $scope.resultado).then(function(ingrediente){
      FacaOSeuService.set(ingrediente.data.texto);
        $state.go('app.detalheReceita');
    });

  }
  $scope.enviarpele = function(){
    $state.go('app.tipospele');
  }
  $scope.enviarbeneficios = function(){
    $state.go('app.beneficiospele');
  }


})

.controller('tipospeleCtrl', function($scope, $state, $stateParams, FacaOSeuService) {

})
.controller('CarouselController', function($scope) {
    $scope.swiper = {};

    $scope.onReadySwiper = function (swiper) {

        swiper.on('slideChangeStart', function () {
            console.log('slide start');
        })

        swiper.on('onSlideChangeEnd', function () {
            console.log('slide end');
        })
    }
})

.controller('beneficiospeleCtrl', function($scope, $state, $stateParams, FacaOSeuService) {

})

.controller('DetalheReceitaCtrl', function($scope, $state, $stateParams, FacaOSeuService) {
  // ele deve receber o objeto das receitas
  $scope.resultados = FacaOSeuService.get();

  $scope.irMapa = function(){
    $state.go('app.ondeComprar')
  }
})

// .controller('LoginDuvidasCtrl', function($scope, $state, Facebook, $cordovaOauth) {
//   $scope.login = function(){
//     //Facebook.login(function(response) {
//     //  $cordovaOauth.facebook('369080470174725', ['public_profile']).then(function(err, response){
//     //    if(err){
//     //      console.log(err);
//     //    }
//         $state.go('app.duvidas');
//       }})
//       //});
//     //});
//   //}
// //})

.controller('DuvidasCtrl', function($scope, $state, Facebook, $http, $interval, $timeout, $ionicScrollDelegate, $firebaseAuth, $firebaseObject, $firebaseArray) {

  var reflorem = new Firebase("https://smartlorem.firebaseio.com/Mensagens/"+ "claudia");
  var loremmensagens = $firebaseArray(reflorem);
  var obj = $firebaseObject(reflorem);
  console.log(loremmensagens)

  $scope.dados = {};
  $scope.mensagens = $firebaseArray(reflorem);

  var intervalo;
  $scope.dados.nome="Claudia Morazzoni" //incluir com ID
  //   Facebook.api('/me', function (response){
  //   $scope.dados.nome = response.name;
  //   console.log(response)
  // });

  $scope.mandarMensagem = function (){
    //por enquanto está com IP da Natty
    // $http.post('localhost:3000/chat', $scope.dados).then(function(){
    //   $scope.dados.conteudo = '';
    // });
    var msg = {}
    msg.nome=$scope.dados.nome; //"dono da msg"
    msg.conteudo=$scope.dados.conteudo;

    $scope.mensagens.$add(msg)

    iniciarIntervalo();
    $ionicScrollDelegate.scrollBottom();
    }

  function iniciarIntervalo(){

    $scope.callAtTimeout = function() {

      console.log($scope.dados.conteudo)
      var msg = {};



      console.log("$scope.callAtTimeout - Timeout occurred");
   }

   $timeout( function(){ $scope.callAtTimeout(); }, 1000);

    if($scope.dados.conteudo){
      console.log("ok")
    }else{
      $scope.dados.conteudo=""
    }

   var data = $.param({
     enviando:$scope.dados.conteudo,
     usuario:$scope.dados.nome
      })



  var url = 'https://smarloremapp.herokuapp.com/chamar2' //Geo não mexer neste servidor//
   var xsrf = data;
   $http({
       method: 'POST',
       url: url,
       data: xsrf,
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function (data, status, headers, config) {
                console.log(data)
                console.log("results")
              var msg = {};
              msg.nome="SmartLorem";
              msg.conteudo = data;
              $scope.mensagens.$add(msg)
              $ionicScrollDelegate.scrollBottom();

              console.log("results")
                    })
  //   console.log(intervalo);
  //   if(intervalo && intervalo.$$state.value != 'canceled'){
  //     console.log('intervalo já está ativo');
  //     return;
  //   }
  //
  //   console.log('intervalo inicializado');
    // intervalo = $interval(function(){
      // $http.get('localhost:3000/chat').then(function(response){
      //   $scope.mensagens = response.data;

      // });
    // }, 1000);
  }

  $scope.apagar = function(){
    console.log('intervalo cancelado');
    $scope.mensagens = [];
    $interval.cancel(intervalo);
  }

  iniciarIntervalo();
})


.controller('SobreCtrl', function($scope) {
})


.controller('OndeComprarCtrl', function($scope) {

  var map;
  var service;
  var infowindow;
  initMap();

});

function initMap() {
  var brasil = {lat: -23.551976, lng: -46.630359};

  map = new google.maps.Map(document.getElementById('map'), {
    center: brasil,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.textSearch({
    location:brasil,
    radius: 50000,
    query: ['Essências'],
    type:"store"
    }, callback);
}


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
