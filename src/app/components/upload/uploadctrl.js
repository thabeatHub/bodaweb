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
                $log.log(vm.obj.files);                
            }

            vm.dropzone = document.getElementById('dropzonebox');

            // vm.galleryContainer = document.getElementById('gallery-container');

            // vm.galleryContainer.ondrop = function(e){
            //     e.preventDefault();
            // }
            // 
            
            vm.methodUplaod = function(flowFile, flowChunks){
                $log.log(flowFile);
                $log.log(flowChunks);
            }



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