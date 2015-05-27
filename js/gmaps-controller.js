//'use strict';
//
//firstTest.controller('MapCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
//
//
//    var map;
//
//    function initialize() {
//        var mapOptions = {
//            zoom: 12,
//            center: new google.maps.LatLng(53.8975615, 27.5523381)
//        };
//        map = new google.maps.Map(document.getElementById('map-canvas'),
//            mapOptions);
//    }
//
//    google.maps.event.addDomListener(window, 'load', initialize);
//
//    //
//    //var marker = new google.maps.Marker({
//    //    map: map,
//    //    position: place.geometry.location,
//    //    title: place.name,
//    //    icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
//    //});
//
//    //var hotels = [
//    //    ['ibis Birmingham Airport', 52.452656, -1.730548, 4],
//    //    ['ETAP Birmingham Airport', 52.452527, -1.731644, 3],
//    //    ['ibis Birmingham City Centre', 52.475162, -1.897208, 2]
//    //];
//    //
//    //for (var i = 0; i < hotels.length; i++) {
//    //    var hotel = hotels [i];
//    //    var marker = new google.maps.Marker({
//    //        position: new google.maps.LatLng(hotel[1], hotel[2]),
//    //        map: map,
//    //        icon: image,
//    //        title: hotel[0],
//    //        zIndex: hotel[3]
//    //    });
//    //}
//
//
//}]);







var firstTest = angular.module('firstTest', []);
firstTest.controller('NotificationBoxController',function($scope,items) {
    $scope.items = items;

    //$scope.showMe= function(){
        items.query();
    //}
});

firstTest.controller('NotificationController',function($scope,items) {
    $scope.items = items;
});


firstTest.factory('items', function ($http) {

    var current = {};

    var factory = {
        query: function () {
            var data = $http.get('http://testx.xameleon.by/maps').then(function (result) {
                current = result.data.items;
                console.log(current)
            }, function (result) {
                alert("Error: No data returned");
            });
        },
        getList: function () {
            return current;
        }
    };
    return factory;
});