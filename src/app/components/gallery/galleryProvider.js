(function() {
    'use strict';

    angular
        .module('bodasergi')
        .config(function (LightboxProvider) {
			  LightboxProvider.fullScreenMode = true;
		});
})();