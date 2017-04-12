(function() {
  'use strict';

  angular
    .module('bodasergi')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/map', {
        templateUrl: 'app/components/views/map.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/horaris', {
        templateUrl: 'app/components/views/horaris.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/suggestions', {
        templateUrl: 'app/components/views/prohibit.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/present', {
        templateUrl: 'app/components/views/regal.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'app/components/views/contact.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/gallery',{
        templateUrl: 'app/components/gallery/gallery.html',
        controller: 'GalleryController',
        controllerAs: 'gallery'
      })
      .when('/gallery/:user',{
        templateUrl: 'app/components/gallery/gallery.html',
        controller: 'GalleryController',
        controllerAs: 'gallery'
      })
      .when('/upload',{
        templateUrl: 'app/components/upload/upload.html',
        controller: 'UploadController',
        controllerAs: 'upload'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
