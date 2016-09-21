"use strict";

(function() {
    var app = angular.module('weatherApp', [])

    // ------ definitions ---------
    var url = 'http://api.openweathermap.org/data/2.5/forecast'
    var cities = ['Austin', 'Dallas', 'San Antonio']

    // ------ controller ---------
    app.controller('WeatherController', function ($scope, $http) {
      $scope.units = 'metric'

      // function weather (city) {
      //   console.log(city)
      //   $http.jsonp(url, { params : {
      //     q : city,
      //     units : $scope.units,
      //     appid : '9eee084476f605e9dada18503be885cd',
      //     callback : 'JSON_CALLBACK'
      //   }}).success(function (data, status, headers, config) {
      //     console.log(data)
      //     return data
      //   }).error(function () {
      //     console.log('error')
      //   })
      // }

      $scope.toggle = function () {
        if($scope.units == 'metric') {
          $scope.units = 'imperial'
        }else if($scope.units == 'imperial') {
          $scope.units = 'kelvin'
        }else if ($scope.units == 'kelvin') {
          $scope.units = 'metric'
        }
      }

      $scope.cities = []
      cities.forEach(function (city, index) {
        $http.jsonp(url, { params : {
          q : city,
          units : $scope.units,
          appid : '9eee084476f605e9dada18503be885cd',
          callback : 'JSON_CALLBACK'
        }}).success(function (data, status, headers, config) {

        var object = {city: city, temp: data.list[0].main.temp}
        $scope.cities.push(object)
      }).error(function () {
        console.log('error')
      })

      })


  }).directive('myDirective', function () {
    return {
      restrict: "A",
      template: '<td>{{ myDirective.city }}</td><td>{{ myDirective.temp }}</td>',
      scope: {
        myDirective: '='
      },
      link: function(scope, element, attrs, controller) {
      }
    }
  })
})()
