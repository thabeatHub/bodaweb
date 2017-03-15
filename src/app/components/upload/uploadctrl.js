(function(){
	// body...
    
    Dropzone.autoDiscover = false; 

	angular
		.module('bodasergi')
		.controller('UploadController', UploadController)
        .directive('dropDirective', function(){
            // Runs during compile
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                template: '<ng-dropzone action="/target" class="dropzone" options="$ctrl.dzOptions" callbacks="$ctrl.dzCallbacks" methods="$ctrl.dzMethods"></ng-dropzone>',
                controller : function(){
                    var vm = this;

                    // children yet not link
                    vm.$onInit = function(){
                        vm.dzOptions = {
                            url : '/upload',
                            acceptedFiles : 'image/jpeg, images/jpg, image/png',
                            addRemoveLinks : true,
                            dictDefaultMessage : 'Click to add or drop photos (10 max)',
                            dictRemoveFile : 'Remove photo',
                            dictResponseError : 'Could not upload this photo',
                            paramName : 'photo',
                            maxFilesize : '10',
                            maxFiles : '10'
                        };

                        vm.dzCallbacks = {};
                        vm.dzMethods = {};
                    };

                    // children are linked
                    vm.$postLink = function(){
                        var dz = vm.dzMethods.getDropzone();
                        console.log(dz);
                    }
                }
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            };
        });

		/** @ngInject */

		function UploadController($scope, $http, $log, $routeParams, loginService, customAWSService){

			var vm = this;

			var fileChooser = document.getElementById('file-chooser');
            var button = document.getElementById('upload-button');
            var results = document.getElementById('results');
            vm.fileName; 
            vm.file;
            vm.obj = {};

            vm.dropzone = document.getElementById('dropzone');

            vm.dropzone.ondrop = function(e){
                e.preventDefault();
                this.className = 'dropzone';

                
                if(e.dataTransfer.files.length==1){
                    console.log("Ok!");
                    console.log(e.dataTransfer.files[0]);
                    vm.newItem.FileName = e.dataTransfer.files[0].name;
                    console.log("FileName: " + vm.newItem.FileName);
                    vm.newItem.FileDate = e.dataTransfer.files[0].lastModifiedDate.toISOString().slice(0,10);
                    console.log("FileDate: " + vm.newItem.FileDate);
                    vm.$digest();
                    return e.dataTransfer.files[0];
                }
                else console.log("There was some sort of error: Should be exclusively one item!");
            }
            vm.dropzone.ondragover = function(e){
                this.className = 'dropzone over';
                return false;
            }
            vm.dropzone.ondragleave = function(e){
                this.className = 'dropzone';
                return false;
            }
            
            button.addEventListener('click', function() {
              
              vm.file = fileChooser.files[0];

              if (vm.file) {
                results.innerHTML = '';
                //console.log(vm.file.name);
                vm.fileName = String(vm.file.name);
                vm.populate();

                console.log(vm.obj);

                var params = {
                    Key: "uploads/" + vm.obj.location, 
                    ContentType: vm.file.type, 
                    Body: vm.file,
                    Metadata: {
                        file: String(vm.fileLabel),
                        description: String(vm.fileDescription),
                        date: String(vm.fileDate),
                        type: String(vm.fileType),
                        tags: String(vm.fileTags),
                        locatiion: String(vm.obj.location)
                    }
                };

                customAWSService.bucket.config.credentials = customAWSService.AWS.config.credentials;
                
                customAWSService.bucket.upload(params, function (err, data) {
                  results.innerHTML = err ? 'ERROR!' + String(err) : 'UPLOADED.';
                });
              } else {
                results.innerHTML = 'Nothing to upload.';
              }
            }, false);

            
            vm.stringyObj = {}; //JSON.stringify(vm.obj,null,"    ");
                vm.stringyObj.label = vm.fileLabel;
                vm.stringyObj.description = vm.fileDescription;
                vm.stringyObj.date = vm.fileDate;
                vm.stringyObj.type = vm.fileType;
                vm.stringyObj.tags = vm.fileTags;
                if(vm.file){
                    vm.stringyObj.location = String(vm.fileType+"s/"+vm.fileName);
                }
            vm.populate = function(){
                vm.obj.label = vm.fileLabel;
                vm.obj.description = vm.fileDescription;
                vm.obj.date = vm.fileDate;
                vm.obj.type = vm.fileType;
                vm.obj.tags = vm.fileTags;
                if(vm.file){
                    vm.obj.location = String(vm.fileType+"s/"+vm.fileName);
                }
                console.log(JSON.stringify(vm.obj,null,"    "));
            };

            //Set options for dropzone
            //Visit http://www.dropzonejs.com/#configuration-options for more options
                vm.$onInit = function(){
                    vm.dzOptions = {
                        url : '/upload',
                        acceptedFiles : 'image/jpeg, images/jpg, image/png',
                        addRemoveLinks : true,
                        dictDefaultMessage : 'Click to add or drop photos (10 max)',
                        dictRemoveFile : 'Remove photo',
                        dictResponseError : 'Could not upload this photo',
                        paramName : 'photo',
                        maxFilesize : '10',
                        maxFiles : '10'
                    };

                    vm.dzCallbacks = {};
                    vm.dzMethods = {};
                };

                // children are linked
                vm.$postLink = function(){
                    var dz = vm.dzMethods.getDropzone();
                    console.log(dz);
                }

		}
})();