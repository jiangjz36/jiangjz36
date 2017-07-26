'use strict';
angular.module('app',['ui.router', 'ngCookies', 'validation', 'ngAnimate'])

'use strict';
angular.module('app').value('dict',{}).run(['dict','$http',function (dict,$http) {
    $http.get('/data/city.json').success(function (resp) {
        dict.city=resp;
    })
    $http.get('/data/salary.json').success(function (resp) {
        dict.salary=resp;
    })
    $http.get('/data/scale.json').success(function (resp) {
        dict.scale=resp;
    })
}])
'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    //config是用来配置的
    $stateProvider.state('main',{
        url:'/main',
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    }).state('position',{
        url:'/position/:id',
        templateUrl:'view/position.html',
        controller:'positionCtrl'
    }).state('company',{
        url:'/company/:id',
        templateUrl:'view/company.html',
        controller:'companyCtrl'
    }).state('search',{
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    }).state('my',{
        url:'/my',
        templateUrl:'view/my.html',
        controller:'myCtrl'
    }).state('login',{
        url:'/login',
        templateUrl:'view/login.html',
        controller:'loginCtrl'
    }).state('register',{
        url:'/register',
        templateUrl:'view/register.html',
        controller:'registerCtrl'
    })
    $urlRouterProvider.otherwise('main')
}])

'use strict';
angular.module('app').config(['$validationProvider',function ($validationProvider) {
    var expression={
        phone:/^1[\d]{10}$/,
        password:function (value) {
            var str=value+'';
            return str.length>5;
        }
    }

    var defaultMsg={
        phone:{
            success:'',
            error:'必须是11位手机号'
        },
        password:{
            success:'',
            error:'长度至少是6位'
        }
    }

    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])

'use strict';
angular.module('app').controller('companyCtrl',['$scope',function ($scope) {
    //点击返回
    $scope.back=function () {
        window.history.back()
    }
}])
'use strict';
angular.module('app').controller('loginCtrl',['$state','$scope',function ($state,$scope) {
    $scope.submit=function () {
        $state.go('main')
        // console.log($scope.user)
    }
}])


'use strict';
angular.module('app').controller('mainCtrl',['$http','$scope',function ($http,$scope) {
    $http.get('/data/positionList.json').success(function (resp) {
        // console.log(resp);
        $scope.list=resp;
    })
}])

'use strict';
angular.module('app').controller('myCtrl',['$scope',function ($scope) {
    
}])

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


'use strict';
angular.module('app').controller('registerCtrl',['$scope',function ($scope) {
    $scope.submit=function () {
        console.log($scope.user);

    }
}])



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
