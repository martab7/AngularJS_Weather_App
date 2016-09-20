"use strict";

(function() {
    var app = angular.module('weatherApp', [])

    app.controller('WeatherController', function ($scope, $http) {

    var cities = ['Austin', 'Dallas', 'San Antonio']
    $scope.units = 'metric'

    this.toggle = function () {
      if($scope.units == 'metric') {
        $scope.units = 'imperial'
      }else if($scope.units == 'imperial') {
        $scope.units = 'kelvin'
      }else if ($scope.units == 'kelvin') {
        $scope.units = 'metric'
      }

      cities.forEach(function (city){
        $scope.city = city
        var url = 'http://api.openweathermap.org/data/2.5/forecast'

        $http.jsonp(url, { params : {
          q : $scope.city,
          units : $scope.units,
          appid : '9eee084476f605e9dada18503be885cd',
          callback : 'JSON_CALLBACK'
        }}).success(function (data, status, headers, config) {
          $scope.main = data.list[0].main.temp
          console.log($scope.main)
        })
      })
      console.log('hi')
    }

  })
})()
