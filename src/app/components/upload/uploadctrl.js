(function(){
	// body...
    

	angular
		.module('bodasergi')
		.controller('UploadController', UploadController);

		/** @ngInject */

		function UploadController($scope, $http, $log, $routeParams, loginService, customAWSService){

			var vm = this;

            vm.obj = {};
            
            //vm.count = 0;

            $scope.$on("EventUpdate", function(){
                //vm.count++;
                //$log.log(vm.progressDict);
                $scope.$apply();
            });

            vm.showObject = function(){
                $log.log(vm.obj);
                $log.log(vm.obj.files);                
            }

            vm.dropzone = document.getElementById('dropzonebox');

            vm.sendToS3 = function(object){
                //object.upload();

                $scope.$watch(
                    object,
                    function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                             return newvalue;
                        }
                    }
                );

                vm.progressDict = new Array();

                for (i = 0 ; i < object.files.length ; i++){

                    var params = {
                        Bucket: customAWSService.bucketName,
                        Key: "testupload/" + object.files[i].file.name
                            .replace(/\s+/g, '_'), //sanitized
                        ContentType: object.files[i].file.type, 
                        Body: object.files[i].file,
                        Metadata: {
                            file: String(),
                            description: String(),
                            date: String(),
                            type: String()
                        }
                    };

                    vm.updateProgress = function(evt) {

                        var tempkey = evt.key.split('/').pop();
                        
                        vm.progressDict[tempkey].value = ((evt.loaded * 100) / evt.total);
                        
                        $log.log("Uploaded :: " + parseInt(vm.progressDict[tempkey].value)+'%');

                        $scope.$emit("EventUpdate");
                        $scope.$broadcast("EventUpdate");
                    }
                  
                    vm.progressDict[params.Key.split('/').pop()] = {
                        id: i,
                        value: 0
                    };

                    vm.uploadMan = new customAWSService.AWS.S3.ManagedUpload({
                        params: params
                    });

                    vm.uploadMan.on('httpUploadProgress', vm.updateProgress);

                    vm.uploadMan.send(
                        function(err, data){
                            if(err){
                                $log.log("There was some error uploading. Error: "+err);
                                return;
                            }
                            $log.log("SUCCESS!");
                            //$log.log(data);
                        }
                 
                    );
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