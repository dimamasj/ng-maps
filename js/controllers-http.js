'use strict';

var firstTest = angular.module('firstTest', ['ngRoute']);

firstTest.factory('itemsList', function ($http) {
    var current = [];
    var factory = {
        query: function () {
            var data = $http.get('http://testx.xameleon.by/maps').then(function (result) {
                //console.log(result);
                current = result.data.items;
                //console.log(current)
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


firstTest.config(['$routeProvider', '$locationProvider', function ($routeProvide, $locationProvide) {
    $locationProvide.html5Mode({
        enable: true,
        requireBase: false
    });
    //$locationProvide.html5Mode(true);
    $routeProvide
        .when('/', {
            templateUrl: 'template/home.html',
            controller: 'BarsCtrl'
        })
        .when('/about', {
            templateUrl: 'template/about.html',
            controller: 'AboutCtrl'
        })
        .when('/contact', {
            templateUrl: 'template/contact.html',
            controller: 'ContactCtrl'
        })
        .when('/bar/:barId', {
            templateUrl: 'template/def-bar.html',
            controller: 'BarDefCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);


firstTest.controller('BarsCtrl', ['$scope', 'itemsList', function ($scope, itemsList) {
    var self = this;
    self.bars = itemsList;
    self.bars.query();

    //$scope.sortField = undefined;
    //$scope.reverses = false;
    //
    //$scope.sort = function (fieldName) {
    //    if ($scope.sortField == fieldName) {
    //        $scope.reverses = !$scope.reverses;
    //    } else {
    //        $scope.sortField = fieldName;
    //        $scope.reverses = false
    //    }
    //};

}]);


//firstTest.factory('itemId', [ '$routeParams', function ($http, $routeParams) {
//    var self = this;
//    self.barId = $routeParams;
////
////
////    self.barId = $routeParams.barId;
////    var url = $routeParams.barId;
////
////    var x = self;
////
////    console.log(self.barId);
////    console.log(url);
//////return x;
////    //var url = $routeParams.barId;
////    //
////    var x = $http.get('http://testx.xameleon.by/maps/' + url).success(function (data) {
////        self.bar = data.item;
////    });
////
//
//
//    console.log(self);
//
//    return self;
//
//}]);
//
//
//firstTest.controller('BarDefCtrl', ['$scope', 'itemId', function ($scope, $http, $location, itemId) {
//
//
//    //console.log(itemId);
//
//
//    //$http.get('http://testx.xameleon.by/maps/' + itemId).success(function (data) {
//    //    $scope.bar = data.item;
//    //});
//
//    //console.log( iremId);
//
//}]);


firstTest.controller('BarDefCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.barId = $routeParams.barId;
    var url = $routeParams.barId;

    $http.get('http://testx.xameleon.by/maps/' + url).success(function (data) {
        $scope.bar = data.item;
    });

}]);

firstTest.controller('AboutCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

}]);

firstTest.controller('ContactCtrl', ['$scope', function ($scope) {


}]);


firstTest.controller('MapCtrl', ['$scope', '$http', 'itemsList', '$location', '$routeParams', function ($scope, $http, itemsList, $location, $routeParams) {
    var self = this;

    var styles = [
        {
            "stylers": [
                {"invert_lightness": true},
                {"lightness": 18},
                {"gamma": 0.75}
            ]
        }, {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
                {visibility: "on"},
                {color: "#000000"},
                {lightness: 0},
                {"visibility": "simplified"}
            ]
        }
    ];
    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

    self.myMap = function () {

        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(53.8975615, 27.5523381)
        };

        self.map = new google.maps.Map(document.getElementById('myMap'),
            mapOptions);

        self.map.mapTypes.set('map_style', styledMap);
        self.map.setMapTypeId('map_style');
    };


    $scope.$watch(itemsList.getList, function (itemsList) {

        self.places = itemsList;

        angular.forEach(self.places, function (place) {

            var content = '' +
                '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">' + place.title + '</h1>' +
                '<h1 id="secondHeading" class="secondHeading">' + place.address + '</h1>' +
                '<div id="bodyContent">' + place.body +
                '</div>' +
                '</div>';

            var image = new google.maps.MarkerImage(
                'img/beer-cup.png',
                new google.maps.Size(50, 50),
                new google.maps.Point(0, 0),
                new google.maps.Point(0, 50)
            );

            var infowindow = new google.maps.InfoWindow({
                content: content
            });

            if (place.coord = place.geo != "" ? angular.fromJson(place.geo) : null) {
                var marker = new google.maps.Marker({
                    map: self.map,
                    position: {lat: place.coord[0], lng: place.coord[1]},
                    icon: image
                });

                //var marker = '<a href="#/bar/' + place.id + '">' + marker1 + '</a>';

                google.maps.event.addListener(marker, 'click', function () {
                    //self.infowindow.close();
                    infowindow.close(marker);
                    infowindow.open(self.map, marker);


                    $location.path('/bar/'+  place.id);

                    //console.log( $location.path('/bar/'+  place.id));



                    $scope.barId = $routeParams.barId;
                    var url = $routeParams.barId;

                    $http.get('http://testx.xameleon.by/maps/' + url).success(function (data) {
                        $scope.bar = data.item;
                    });





                    //$scope.barId = '/bar/' + place.id;
                    ////var url = $routeParams.barId;
                    //
                    //console.log( $scope.barId);
                    //
                    //$http.get('http://testx.xameleon.by/maps/' + place.id).success(function (data) {
                    //
                    //
                    //    console.log('success');
                    //
                    //    $scope.bar = data.item;
                    //});


                });
                google.maps.event.addListener(self.map, 'click', function () {
                    infowindow.close(self.map, marker);

                    $location.path('/');
                });
            }
            else {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': place.address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: self.map,
                            position: results[0].geometry.location,
                            icon: image
                        });
                        google.maps.event.addListener(marker, 'click', function () {
                            //self.infowindow.close();
                            infowindow.close(marker);
                            infowindow.open(self.map, marker);
                            //console.log(place.id);

                        });
                        google.maps.event.addListener(self.map, 'click', function () {
                            infowindow.close(self.map, marker);
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }

        });

    });
    self.myMap();

}]);