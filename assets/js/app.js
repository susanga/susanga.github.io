'use strict';

var app = angular.module('susanga', ['ui.bootstrap'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});


app.factory('songFactory', function($http) {
  var videos = [];
  return {
    getVideos: function getVideos() {
      return $http.get('/live-videos.json');
    },
    getAudios: function getAudios() {
      return $http.get('/live-audios.json');
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

app.controller('VideoController', function ($scope, $timeout, songFactory) {
  
  $scope.itemsPerPage = 2
  $scope.currentPage = 1;

  $scope.pageCount = function () {
    return Math.ceil($scope.friends.length / $scope.itemsPerPage);
  };

  songFactory.getVideos().success(function(data){
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


app.controller('AudioController', function ($scope, $timeout, songFactory) {
  
  $scope.itemsPerPage = 2
  $scope.currentPage = 1;

  $scope.pageCount = function () {
    return Math.ceil($scope.friends.length / $scope.itemsPerPage);
  };

  songFactory.getAudios().success(function(data){
    $scope.list = data.audios;
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