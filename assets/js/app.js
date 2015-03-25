'use strict';

var app = angular.module('susanga', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('VideoController', function ($http) {

  var self = this;

  self.greetings = 'Hello world 2012'

  self.videos = [];
  $http.get('/live-videos.json').success(function(data) {
    self.videos = data.videos;
  });

});