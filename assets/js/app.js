'use strict';

var app = angular.module('susanga', ['ui.bootstrap'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});


app.factory('videoFactory', function($http) {
  var videos = [];
  return {
    get: function() {
      return $http.get('/live-videos.json');
    }
  };
});

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

app.controller('VideoController', function ($scope, $timeout, videoFactory) {
  
  $scope.itemsPerPage = 2
  $scope.currentPage = 1;

  $scope.pageCount = function () {
    return Math.ceil($scope.friends.length / $scope.itemsPerPage);
  };

  videoFactory.get().success(function(data){
    $scope.list = data.videos;
    $scope.currentPage = 1; //current page
    $scope.entryLimit = 20; //max no of items to display in a page
    $scope.filteredItems = $scope.list.length; //Initially for no filter  
    $scope.totalItems = $scope.list.length;  
  });

  $scope.setPage = function(pageNo) {
    $scope.currentPage = pageNo;
  };
  $scope.filter = function() {
    $timeout(function() { 
      $scope.filteredItems = $scope.filtered.length;
    }, 10);
  };

});

app.controller('AudioController', function ($http, $scope) {

 
  $scope.audios = [];

  $http.get('/live-audios.json').success(function(data) {
    $scope.audios = data.audios;
  });
  
});