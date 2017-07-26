'use strict';
angular.module('app').directive('appTab',[function () {
    return{
        restrict:'A',
        scope:{
          list:'=',
            tabClick:'&'
        },
        templateUrl:'view/template/tab.html',
        replace:true,
        link:function ($scope) {
            $scope.click=function (tab) {
                $scope.selectId=tab.id;
                $scope.tabClick(tab);
            }
        }
    }
}])
