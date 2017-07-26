'use strict';
angular.module('app').controller('positionCtrl',['$http','$state','$scope',function ($http,$state,$scope) {
    //点击返回
    $scope.back=function () {
        window.history.back()
    }
    console.log($state.params.id)
    $http.get('/data/position.json?id='+$state.params.id).success(function (resp) {
        $scope.pos=resp;
    })
}])

