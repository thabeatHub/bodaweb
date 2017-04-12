(function(){
	// body...
    

	angular
		.module('bodasergi')
		.controller('GalleryController', GalleryController);

		/** @ngInject */

		function GalleryController($scope, $http, $log, $routeParams, Lightbox, shortenPrefixFilter, loginService, customAWSService){

            //$log.log($routeParams);

            var vm = this;

            var loginArea = document.getElementById('LoginArea');
            loginArea.style.display = 'block';

            vm.filekey = {};
            vm.lightboxImages = new Array();

            var prefix;
            $routeParams.user ? prefix = 'upload/' + $routeParams.user + '/' : prefix = 'upload/';

            $log.log(prefix);

            var params = {
              Bucket: customAWSService.bucketName,
              Delimiter: '/',
              Prefix: prefix
            };

            vm.bucket = new customAWSService.AWS.S3({
                params: {
                    Bucket: customAWSService.bucketName
                }
            });

            vm.getURLSigned = function(key){
                var params = {
                    Bucket: customAWSService.bucketName,
                    Key: key,
                    Expires: 900
                };
                var url = vm.bucket.getSignedUrl('getObject', params);
                return url;
            }

            vm.populateImagesLightbox = function(){
                for (var i = vm.filekey.Contents.length - 1; i >= 0; i--) {
                    vm.lightboxImages[i] = {
                        //'caption' : 'Trying a Caption',
                        'url' : vm.getURLSigned(vm.filekey.Contents[i].Key)
                        
                    };
                }
                //$log.log(vm.lightboxImages);
            }

            vm.openLightboxModal = function (index){
                $log.log(index);
                Lightbox.openModal(vm.lightboxImages, index);
            }

            vm.bucket.listObjects(params, function(err, data) {
              if (err) $log.log(err, err.stack); // an error occurred
              else    ;           // successful response
            })
            .on('success', function(response) {
                $log.log("Success!");
            })
            .on('error', function(response) {
                $log.log("Error!");
            })
            .on('complete', function(response) {
                vm.filekey = response.data;
                //$log.log(vm.filekey);
                $scope.$apply();
            });

        }


})();