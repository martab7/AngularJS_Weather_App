"use strict";

(function() {
    var app = angular.module('weatherApp', [])

    app.controller('WeatherController', function ($scope, $http) {

    $scope.city = 'Austin'
    $scope.units = 'metric'

    // $scope.toggle = function () {
      var url = 'http://api.openweathermap.org/data/2.5/forecast'

      $http.jsonp(url, { params : {
        q : $scope.city,
        units : $scope.units,
        appid : '9eee084476f605e9dada18503be885cd',
        callback : 'JSON_CALLBACK'
      }}).success(function (data, status, headers, config) {
        console.log('hi')
        $scope.main = data.list[0].main.temp
        console.log($scope.main)
      })
    // }

  })
})()
