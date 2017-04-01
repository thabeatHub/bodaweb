// login General Service

(function(){
	angular
		.module('bodasergi')
		.service('loginService', loginService);

		loginService.$inject = ['loginFBService'];

		function  loginService(loginFBService){

			vm = this;
			//default right now is FB
			vm.loginFBService = loginFBService;
			document.getElementById('LoginWithFB').style.display = 'block';

		}
})();