angular.module('starter.services', [])

.factory('FacaOSeuService', function() {

  var result = {};

  return {
    set: function(ingrediente) {
      result.texto= ingrediente;
    },
    get: function() {
        return result;
    }
  }
});
