'use strict';
angular.module('app').directive('appSheet',[function () {
    return{
        restrict:'A',
        scope:{
            list:'=',
            visible:'=',
            select:'&'
        },
        templateUrl:'view/template/sheet.html',
        replace:true
    }
}])
