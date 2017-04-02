(function(){
	// body...
    

	angular
		.module('bodasergi')
		.controller('GalleryController', GalleryController);

		/** @ngInject */

		function GalleryController($scope, $http, $log, $routeParams, shortenPrefixFilter, loginService, customAWSService){

            $log.log($routeParams);

            var vm = this;

            vm.filekey = {};

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
                $log.log("Always!");
                vm.filekey = response.data;
                $log.log(vm.filekey);
                $scope.$apply();
            });

        }


})();