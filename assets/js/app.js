'use strict';

(function () {

  var app = angular.module('susanga', ['ngAnimate', 'ui.bootstrap'], function($interpolateProvider) {
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


  app.controller('AdvertController', function ($scope, $timeout) {

    $scope.formSuccess = false;
    $scope.showSuccessNotice = false;
    $scope.loadingSubmit = false;

    $scope.bannerOptions = [
      { id: 1, name: "Banner Location 1"},
      { id: 2, name: "Banner Location 2"},
      { id: 3, name: "Banner Location 3"},
      { id: 4, name: "Banner Location 4"},
      { id: 5, name: "Banner Location 5"},
    ];


    // Form object

    $scope.advert = {
      name: '',
      email: '',
      contactNumber: '',
      option: 'Banner Location 1',
      message: ''
    };

    var clearForm = function clearForm() {
      if ($scope.advertForm) $scope.advertForm.$setPristine();
      $scope.advert = {
        name: '',
        email: '',
        contactNumber: '',
        option: 'Banner Location 1',
        message: ''
      };
    };

    var onMessageComplete = function(error) {
      console.log("success callback!");
      if (error) {
        // error handling
      } else {
        console.log("came to success condition!");
        $scope.$apply(function () {

          // Clear the form & get ready for next request
          clearForm();
          $scope.formSuccess = true;         
          $scope.showSuccessNotice = true;                 
          $scope.loadingSubmit = false;

          // Wait 60 seconds to reset/activate the form again
          var waitTwoSeconds =  $timeout( function(){ 
            clearForm();
            $scope.formSuccess = false;         
            $scope.showSuccessNotice = false;                 
          }, 15000);

        });        
      }
    };
    $scope.submitForm = function submitForm() {
      $scope.loadingSubmit = true;
      // Store emails to firebase
      var myFirebaseRef = new Firebase("https://svtdemo.firebaseio.com/addbanners");
      myFirebaseRef.push($scope.advert, onMessageComplete); 
    };

  });

}());