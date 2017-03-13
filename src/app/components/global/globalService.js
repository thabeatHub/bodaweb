//globalService defined just for testing purposes

(function(){
	angular
		.module('bodasergi')
		.service('globalService', globalService);

		globalService.$inject = [];

		function globalService(){
			var vm = this;

			var _message = "Hello There!";
			this.getMessage = function(){
				return _message;
			}
		}
})();