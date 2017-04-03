// loginFBService
(function(){
	angular
		.module('bodasergi')
		.service('loginFBService', loginFBService);

		/** @ngInject */

		function  loginFBService($location, $log, customAWSService, globalService){
			/*!
			* Login to your application using Facebook.
			* Uses the Facebook SDK for JavaScript available here:
			* https://developers.facebook.com/docs/javascript/gettingstarted/
			*/

			var vm = this;

			vm.fbUserId;
			vm.fbName;
			vm.fbNameParsed;

			(function(d) {
				var a = d.createElement('a'); a.href = '#';
				a.id = 'LoginWithFB';
				a.className = "btn btn-primary btn-md";
				a.innerHTML = 'Login via FB';
				d.getElementById('LoginArea').appendChild(a);
			})(document);

			(function(d) {
				var a = d.createElement('a'); a.href = '#';
				a.id = 'LogoutFB';
				a.className = "btn btn-primary btn-md";
				a.innerHTML = 'Logout';
				d.getElementById('LoginArea').appendChild(a);
			})(document);
			
			//Facebook app Id
			var appId = '930647563739051';

			var loginWithFB = document.getElementById('LoginWithFB');
			loginWithFB.style.display = 'block';

			// window.fbAsyncInit //Use this to login onLoad
			loginWithFB.onclick = function () {
				vm.actuallocation = $location.absUrl();

				FB.init({
					appId: appId,
					status: true, 
					cookie: true, 
					xfbml: true,
					version: 'v2.4'
				});
				FB.login(function (response) {
					customAWSService.AWS.config.credentials = new AWS.WebIdentityCredentials({
						ProviderId: 'graph.facebook.com',
						RoleArn: customAWSService.roleArnFB,
						WebIdentityToken: response.authResponse.accessToken
					});
					if(response){
						//$log.log(response);
						vm.fbUserId = response.authResponse.userID;

						FB.api('/me', function(response) {
						       $log.log('Good to see you, ' + response.name + '.');
						       //$log.log(response);
						       vm.fbName = response.name;
						       vm.fbNameParsed = vm.fbName.replace(/\s+/g, '.');
						       //$log.log("FB User ID "+ vm.fbUserId);
						       //$log.log("FB User Name "+ vm.fbNameParsed);
						});
						
					} else {
						$log.log('User cancelled login or did not fully authorize.');
					}
					//button1.style.display = 'block';
					//button2.style.display = 'block';
					
					$log.log("Credentials "+JSON.stringify(customAWSService.AWS.config.credentials));

					var logmessageElement = document.getElementById('logmessage');
					logmessageElement.innerHTML = 'LOGGED IN!';
					logmessageElement.className = 'ok';       
					//document.getElementById('navigationmenu').style.display = 'block';
					document.getElementById('LogoutFB').style.display = 'block';
					document.getElementById('LoginWithFB').style.display = 'none';

					window.location.replace(vm.actuallocation);
				});

			};

			document.getElementById('LogoutFB').onclick = function () {

				vm.actuallocation = $location.absUrl();

				$log.log("#### StartLogout Script " + vm.actuallocation);

				customAWSService.AWS.config.credentials = new AWS.WebIdentityCredentials({
					ProviderId: '',
					RoleArn: '',
					WebIdentityToken: ''
				});

				$log.log("Credentials "+JSON.stringify(customAWSService.AWS.config.credentials));

				document.getElementById('LogoutFB').style.display = 'none';
				document.getElementById('LoginWithFB').style.display = 'block';
				document.getElementById('logmessage').innerHTML = 'not logged in!';
				document.getElementById('logmessage').className = 'ko';      
				//document.getElementById('navigationmenu').style.display = 'none';

				// FB.init({
				// 	appId: appId,
				// 	status: true, 
				// 	cookie: true, 
				// 	xfbml: true,
				// 	version: 'v2.4'
				// });
				FB.logout(function() {
				//	window.location.reload();


				// 	document.getElementById('LogoutFB').style.display = 'none';
				// 	document.getElementById('LoginWithFB').style.display = 'block';
				// 	document.getElementById('logmessage').innerHTML = 'not logged in!';
				// 	document.getElementById('logmessage').className = 'ko';       
				// 	document.getElementById('navigationmenu').style.display = 'none';
				});
				
				window.location.reload(vm.actuallocation);
			};


			// Load the Facebook SDK asynchronously
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {
					return;
				}
				js = d.createElement(s);
				js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

		}
})();