// login General Service

(function(){
	angular
		.module('bodasergi')
		.service('loginService', loginService);

		loginService.$inject = ['loginFBService'];

		function  loginService(loginFBService){

			//default right now is FB
			document.getElementById('LoginWithFB').style.display = 'block';

		}
})();