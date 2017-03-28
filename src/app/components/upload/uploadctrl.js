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
            
            vm.methodUplaod = function (flowFile, flowChunk){
                $log.log(flowFile);
                $log.log(flowChunk);
            }

            vm.sendToS3 = function(object){
                object.upload();
                for (var i = object.files.length - 1; i >= 0; i--){
                    $log.log(object.files[i]);

                    var params = {
                        Key: "testupload/" + object.files[i].file.name, 
                        ContentType: object.files[i].file.type, 
                        Body: object.files[i].file,
                        Metadata: {
                            file: String(),
                            description: String(),
                            date: String(),
                            type: String()
                        }
                    };

                    customAWSService.bucket.config.credentials = customAWSService.AWS.config.credentials;

                    $log.log("***********");
                    $log.log("Credentials in AWS: \n");
                    $log.log(customAWSService.AWS.config.credentials);
                    $log.log("Credentials in bucket: \n");
                    $log.log(customAWSService.bucket.config.credentials);

                    customAWSService.bucket.upload(params, function (err, data){
                        err ? $log.log('ERROR!' + String(err)) : $log.log('UPLOADED.');
                    });
                }
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