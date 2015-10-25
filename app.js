
angular.module('MyApp', ['pusher-angular','ngMap']).controller('MyCtrl', ['$scope', '$http', '$pusher', function($scope, $http, $pusher){

  var client = new Pusher('fa15651bc1ad6c916fc7');
  var pusher = $pusher(client);
  var issChannel = pusher.subscribe('iss-channel');

  $scope.path = []

  $http.get('/api/location').success(function(data){
    $scope.iss = data;
  });

  issChannel.bind('new-location', function(data){
    console.log("Receiving event...")
    $scope.iss = data
    $scope.path.push([$scope.iss.iss_position.latitude, $scope.iss.iss_position.longitude])
  });



}]);

angular.module('MyApp').directive('googleMap', function($timeout){

  return {
    link: function(scope, el, attrs){

      var marker;
      
      var map = new GMaps({
        div: attrs.id,
        zoom: 4,
        lat: 0,
        lng: 0
      });

      $timeout(function(){
        map.setCenter(scope.iss.iss_position.latitude, scope.iss.iss_position.longitude)
        marker = map.addMarker({
            lat: scope.iss.iss_position.latitude,
            lng: scope.iss.iss_position.longitude,
          icon: "/images/iss75.png"
        });
      }, 2000)


      scope.$watch('path', function(){
        var latlng = new google.maps.LatLng(scope.iss.iss_position.latitude, scope.iss.iss_position.longitude);
        marker.setPosition(latlng);

        map.drawPolyline({
          path: scope.path,
          strokeColor: 'black',
          strokeOpacity: 0.1,
          strokeWeight: 5
        });
      }, true);
    }
  }

});


// // Include 'pusher-angular' as a dependency
// var app = angular.module('MyApp', ['pusher-angular','ngMap'] )

// // Then inject the $pusher service into your controller

// app.controller('MyCtrl', ['$scope', '$pusher', function($scope, $pusher){

//   var client = new Pusher('d5e0d23678bdda79bd04');
// 	var pusher = $pusher(client);
// 	var issChannel = pusher.subscribe('iss-channel');
// 	// console.log(issChannel);
// 	issChannel.bind('new-location', function(iss){
  		
//   		console.log(iss);
//   		$scope.iss = iss;
// 	});

  
// }]);






// function get_coords(address)
// {
//     var gc      = new google.maps.Geocoder(),
//         opts    = { 'address' : address };

//     gc.geocode(opts, function (results, status)
//     {
//         if (status == google.maps.GeocoderStatus.OK)
//         {   
//             var loc     = results[0].geometry.location,
//                 lat     = loc.$a,
//                 long    = loc.ab;

//             console.log(lat);
//         }
//         else
//         {
//             // Ruh roh.  Output error stuff here
//         }
//     });
// }

// get_coords('1600 Pennsylvania Avenue NW Washington, DC 20500')

// how to turn and address into long and lat
// how to make a 100 mile radius
// 


// angular.module('MyApp', ['pusher-angular','ngMap','uiGmapgoogle-maps']).controller('MyCtrl', ['$scope', '$http', '$pusher', '$log', '$timeout', function($scope, $http, $pusher, $log, $timeout){
// fa15651bc1ad6c916fc7
// d5e0d23678bdda79bd04
// 	var client = new Pusher('d5e0d23678bdda79bd04');
// 	var pusher = $pusher(client);
// 	var issChannel = pusher.subscribe('iss-channel');

// 	$scope.path = []

// 	$http.get('/api/location').success(function(data){
// 		$scope.iss = data;
// 	});

// 	issChannel.bind('new-location', function(data){
// 		console.log("Receiving event...")
// 		$scope.iss = data
// 		$scope.path.push([$scope.iss.iss_position.latitude, $scope.iss.iss_position.longitude])
// 	});


//     $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
//     $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
//     $scope.options = {scrollwheel: false};
//     $scope.coordsUpdates = 0;
//     $scope.dynamicMoveCtr = 0;
//     $scope.marker = {
//       id: 0,
//       coords: {
//         latitude: 40.1451,
//         longitude: -99.6680
//       },
//       options: { draggable: true },
//       events: {
//         dragend: function (marker, eventName, args) {
//           $log.log('marker dragend');
//           var lat = marker.getPosition().lat();
//           var lon = marker.getPosition().lng();
//           $log.log(lat);
//           $log.log(lon);

//           $scope.marker.options = {
//             draggable: true,
//             labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
//             labelAnchor: "100 0",
//             labelClass: "marker-labels"
//           };
//         }
//       }
//     };
//     $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
//       if (_.isEqual(newVal, oldVal))
//         return;
//       $scope.coordsUpdates++;
//     });
//     $timeout(function () {
//       $scope.marker.coords = {
//         latitude: 42.1451,
//         longitude: -100.6680
//       };
//       $scope.dynamicMoveCtr++;
//       $timeout(function () {
//         $scope.marker.coords = {
//           latitude: 43.1451,
//           longitude: -102.6680
//         };
//         $scope.dynamicMoveCtr++;
//       }, 2000);
//     }, 1000);
 


 // }]);



// angular.module('appMaps', ['uiGmapgoogle-maps'])
//   .controller('mainCtrl', function ($scope, $log, $timeout) {
//     $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
//     $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
//     $scope.options = {scrollwheel: false};
//     $scope.coordsUpdates = 0;
//     $scope.dynamicMoveCtr = 0;
//     $scope.marker = {
//       id: 0,
//       coords: {
//         latitude: 40.1451,
//         longitude: -99.6680
//       },
//       options: { draggable: true },
//       events: {
//         dragend: function (marker, eventName, args) {
//           $log.log('marker dragend');
//           var lat = marker.getPosition().lat();
//           var lon = marker.getPosition().lng();
//           $log.log(lat);
//           $log.log(lon);

//           $scope.marker.options = {
//             draggable: true,
//             labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
//             labelAnchor: "100 0",
//             labelClass: "marker-labels"
//           };
//         }
//       }
//     };
//     $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
//       if (_.isEqual(newVal, oldVal))
//         return;
//       $scope.coordsUpdates++;
//     });
//     $timeout(function () {
//       $scope.marker.coords = {
//         latitude: 42.1451,
//         longitude: -100.6680
//       };
//       $scope.dynamicMoveCtr++;
//       $timeout(function () {
//         $scope.marker.coords = {
//           latitude: 43.1451,
//           longitude: -102.6680
//         };
//         $scope.dynamicMoveCtr++;
//       }, 2000);
//     }, 1000);
//   });


fredddddd







 