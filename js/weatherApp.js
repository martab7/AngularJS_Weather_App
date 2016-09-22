"use strict";

(function() {
    var app = angular.module('weatherApp', [])

    // ------ definitions ---------
    var url = 'http://api.openweathermap.org/data/2.5/forecast'
    var cities = ['El Paso', 'Dallas', 'San Antonio', 'Austin']
    var units = 'imperial'
    var degree = 'F'

    // ------ controller ---------
    app.controller('WeatherController', function ($scope, $http) {

      $scope.toggle = function () {
        if(units == 'imperial') {
          units = 'metric'
          degree = 'C'
        }else if(units == 'metric') {
          units = 'kelvin'
          degree = 'K'
        }else if (units == 'kelvin') {
          units = 'imperial'
          degree = 'F'
        }

      $scope.select = function (city) {
        $http.jsonp(url, { params : {
          q : city,
          units : units,
          appid : '9eee084476f605e9dada18503be885cd',
          callback : 'JSON_CALLBACK',
        }}).success(function (data, status, headers, config) {
          $scope.selectedCity = data.city.name
          $scope.forecast = []
          data.list.forEach(function (day, index) {
            if((index + 7) % 7 == 0) {
              var object = {
                date: day.dt_txt,
                min: day.main.temp_min,
                max: day.main.temp_max,
                sym: degree
              }
              $scope.forecast.push(object)
            }
          })
        }).error(function () {
          console.log('error')
        })
      }


      $scope.cities = []
      cities.forEach(function (city, index) {
        $http.jsonp(url, { params : {
          q : city,
          units : units,
          appid : '9eee084476f605e9dada18503be885cd',
          callback : 'JSON_CALLBACK'
        }}).success(function (data, status, headers, config) {
        var object = {city: city, temp: data.list[0].main.temp, sym: degree}
        $scope.cities.push(object)
        }).error(function () {
        console.log('error')
        })
      })
    }

  }).directive('myDirective', function () {
    return {
      restrict: "A",
      template: '<td>{{ myDirective.city }}</td><td>{{ myDirective.temp }}&deg{{ myDirective.sym }}</td>',
      scope: {
        myDirective: '='
      },
      link: function(scope, element, attrs, controller) {
      }
    }
  }).directive('selection', function () {
    return {
      restrict: "A",
      template: "<td>{{ selection.date }}</td><td>{{ selection.min | number:0 }}&deg{{ selection.sym }} / {{ selection.max | number:0 }}&deg{{ selection.sym }}</td>",
      scope: {
        selection: '='
      }
    }
  })
})()
