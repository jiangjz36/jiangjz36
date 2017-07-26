'use strict';
angular.module('app').controller('companyCtrl',['$scope',function ($scope) {
    //点击返回
    $scope.back=function () {
        window.history.back()
    }
}])