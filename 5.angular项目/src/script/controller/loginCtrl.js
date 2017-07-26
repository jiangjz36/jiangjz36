'use strict';
angular.module('app').controller('loginCtrl',['$state','$scope',function ($state,$scope) {
    $scope.submit=function () {
        $state.go('main')
        // console.log($scope.user)
    }
}])

