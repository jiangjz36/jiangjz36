"use strict";angular.module("app",["ui.router","ngCookies","validation","ngAnimate"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("/data/city.json").success(function(e){t.city=e}),e.get("/data/salary.json").success(function(e){t.salary=e}),e.get("/data/scale.json").success(function(e){t.scale=e})}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("my",{url:"/my",templateUrl:"view/my.html",controller:"myCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){var e={phone:/^1[\d]{10}$/,password:function(t){return(t+"").length>5}},l={phone:{success:"",error:"必须是11位手机号"},password:{success:"",error:"长度至少是6位"}};t.setExpression(e).setDefaultMsg(l)}]),angular.module("app").controller("companyCtrl",["$scope",function(t){t.back=function(){window.history.back()}}]),angular.module("app").controller("loginCtrl",["$state","$scope",function(t,e){e.submit=function(){t.go("main")}}]),angular.module("app").controller("mainCtrl",["$http","$scope",function(t,e){t.get("/data/positionList.json").success(function(t){e.list=t})}]),angular.module("app").controller("myCtrl",["$scope",function(t){}]),angular.module("app").controller("positionCtrl",["$http","$state","$scope",function(t,e,l){l.back=function(){window.history.back()},console.log(e.params.id),t.get("/data/position.json?id="+e.params.id).success(function(t){l.pos=t})}]),angular.module("app").controller("registerCtrl",["$scope",function(t){t.submit=function(){console.log(t.user)}}]),angular.module("app").controller("searchCtrl",["dict","$http","$scope",function(t,e,l){l.name="",l.search=function(){e.get("/data/positionList.json").success(function(t){l.list=t})},l.search(),l.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}],l.sheet={},l.tClick=function(e,o){l.sheet.list=t[e],l.sheet.visible=!0}}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/sheet.html",replace:!0}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",scope:{list:"=",tabClick:"&"},templateUrl:"view/template/tab.html",replace:!0,link:function(t){t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}]);