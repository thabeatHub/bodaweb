(function() {
  'use strict';

  angular
    .module('bodasergi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, $timeout, $log, customAWSService, webDevTec){

  	var loginArea = document.getElementById('LoginArea');
	loginArea.style.display = 'none';

  }
})();