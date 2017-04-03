(function() {
    'use strict';

    angular
        .module('bodasergi')
        .filter('shortenPrefix', shortenPrefix);

    function shortenPrefix($log, $sce) {
        return filterFilter;

        ////////////////

        function filterFilter(path) {
        	var stringparsed;
        	if(path[path.length - 1] === '/') stringparsed = path.slice(0, path.length - 1);
        	else stringparsed = path;
        	stringparsed = stringparsed.split('/').pop()
            return stringparsed;
        }
    }

})();