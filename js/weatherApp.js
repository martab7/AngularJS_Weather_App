"use strict";

(function() {
    var app = angular.module("weatherApp", []);

    app.controller("WeahterController", function(){
      this.showElement = true;

      this.showElement = !this.showElement;

    })
})();
