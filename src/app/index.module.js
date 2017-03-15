(function() {
  'use strict';
  Dropzone.autoDiscover = false;

  angular
    .module('bodasergi', 
    	['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 
    	'ngMessages', 'ngAria', 'ngRoute', 'toastr', 'thatisuday.dropzone',
    	'ui.bootstrap']);

})();
