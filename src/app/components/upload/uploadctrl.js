(function(){
	// body...
    

	angular
		.module('bodasergi')
		.controller('UploadController', UploadController);

		/** @ngInject */

		function UploadController($scope, $http, $log, $routeParams, loginService, customAWSService){

			var vm = this;

            vm.obj = {};

            vm.showObject = function(){
                $log.log(vm.obj);
            } 
		}
})();