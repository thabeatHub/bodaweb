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

            vm.dropzone = document.getElementById('flowjs');

            vm.dropzone.ondrop = function(e){
                e.preventDefault();
                this.className = 'drop';
            }
            
            vm.dropzone.ondragover = function(e){
                this.className = 'drop over';
            }
            vm.dropzone.ondragleave = function(e){
                this.className = 'drop';
            }
		}
})();