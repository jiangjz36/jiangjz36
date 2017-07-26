'use strict';
angular.module('app').controller('searchCtrl',['dict','$http','$scope',function (dict,$http,$scope) {
    $scope.name='';
    $scope.search=function () {
        $http.get('/data/positionList.json').success(function (resp) {
            // console.log(resp);
            $scope.list=resp;
        })
    }
    $scope.search();


    $scope.tabList=[
        {
            id:'city',
            name:'城市'
        },
        {
            id:'salary',
            name:'薪水'
        },
        {
            id:'scale',
            name:'公司规模'
        }
    ];

//    点击下方出现绿色
    $scope.sheet={}
    $scope.tClick=function (id,name) {
        $scope.sheet.list=dict[id];
        $scope.sheet.visible=true;
    }
}])