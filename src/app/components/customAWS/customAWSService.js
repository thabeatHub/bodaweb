// AWS Operations over SDK service

(function(){
	angular
		.module('bodasergi')
		.service('customAWSService', customAWSService);

		/** @ngInject */

		function customAWSService($q){

			var vm = this;

			vm.AWS = AWS;

			//if (typeof Promise === 'undefined') {
			  AWS.config.setPromisesDependency($q);
			//} //info in https://blogs.aws.amazon.com/javascript/post/Tx3BZ2DC4XARUGG/Support-for-Promises-in-the-SDK

			vm.AWS.config.region = 'eu-west-1';

			vm.roleArnFB = 'arn:aws:iam::934453744996:role/MyAppFBRole';
			
			vm.bucketName = 'casorifestival.com';


		}
})();