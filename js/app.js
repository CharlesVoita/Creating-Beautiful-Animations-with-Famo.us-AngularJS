var faBoilerPlateApp = angular.module('faBoilerPlateApp', ['ui.router', 'famous.angular'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url : "/",
        templateUrl: 'partials/main.html',
        controller: 'mainController'
      })
      .state('home', {
        url : "/second-page",
        templateUrl: 'partials/second.html',
        controller: 'secondController'
      })
      ;
	}
])
.controller('mainController', function($scope, $famous) {
  $scope.mainMessage = "Main Controller Loaded";

})
.controller('secondController', function($scope, $famous, $timeline) {
  var Transitionable = $famous['famous/transitions/Transitionable']; // This will allow us to transition any modifications we make to a surface (like translation, opacity, and scale)
  var Easing = $famous['famous/transitions/Easing']; // Easing gives us some neat Easing options, to ease our transitionables.
  $scope.secondMessage = "Second Controller Loaded";

  $scope.links = [
    {
      text : 'First',
      transform : new Transitionable(0),
      opacity : new Transitionable(0)
    },
    {
      text : 'Second',
      transform : new Transitionable(0),
      opacity : new Transitionable(0)
    },
    {
      text : 'Third',
      transform : new Transitionable(0),
      opacity : new Transitionable(0)
    },
    {
      text : 'Fourth',
      transform : new Transitionable(0),
      opacity : new Transitionable(0)
    },
    {
      text : 'Check out SwiftList at swiftlist.com',
      transform : new Transitionable(0),
      opacity : new Transitionable(0)
    },
  ];

  $scope.linkTimelines = {
      translate: function($transition){
        return $timeline([
          [0, [200, 250, 0], Easing.outBounce],
          [1, [0, 0, 0]]
        ])($transition.get()); // we need to apply the transition and return it
      
      }, // translate
      opacity: function($transition){
        return $timeline([
          [0, 0, Easing.outQuad],
          [1, 1]
        ])($transition.get()); // we need to apply the transition and return it
      
      } // opacity
    
  } // linkTimeLines

  $scope.linkEnter = function(transform, opacity, $index, $done){
    transform.delay((($index*150)), function(){ // we will delay each animation based on index
      transform.set(1, {duration: 1400})
      opacity.set(1, {duration: 1400}, $done)
    
    });
    
  } // linkEnter

})


