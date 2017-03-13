(function() {
  'use strict';

  angular
    .module('bodasergi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('finished runBlock');
  }

})();
