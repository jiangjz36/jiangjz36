'use strict';
angular.module('app').controller('registerCtrl',['$scope',function ($scope) {
    $scope.submit=function () {
        console.log($scope.user);

    }
}])


