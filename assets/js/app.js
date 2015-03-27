'use strict';

var app = angular.module('susanga', ['ui.bootstrap'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('VideoController', function ($http, $scope) {

 
  $scope.filteredVideos = []
   ,$scope.currentPage = 1
  ,$scope.numPerPage = 10
  ,$scope.maxSize = 5;

  $scope.videos = [];

  $http.get('/live-videos.json').success(function(data) {
    $scope.videos = data.videos;

    $scope.numPages = function () {
      return Math.ceil($scope.videos.length / $scope.numPerPage);
    };

    $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.filteredVideos = $scope.videos.slice(begin, end);
  });
  
  });
});

app.controller('AudioController', function ($http, $scope) {

 
  $scope.audios = [];

  $http.get('/live-audios.json').success(function(data) {
    $scope.audios = data.audios;
  });
  
});