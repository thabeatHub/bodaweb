(function() {
  'use strict';

  angular
    .module('bodasergi').config(function (LightboxProvider) {
	  // set a custom template
	  LightboxProvider.templateUrl = 'app/components/lightbox/lightbox.html';
	});;

})();