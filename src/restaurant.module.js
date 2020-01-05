(function() {
"use strict";

/**
 * Restaurant module that includes the public module as a dependency
 */
angular.module('restaurant', ['public'])
.config(config)
.controller('RegistrationController', RegistrationController)
.controller('InfoController', InfoController)
.service('InfoService',InfoService);

InfoController.$inject = ['$scope','InfoService'];

function InfoController($scope,InfoService){
 var info = this;

info.notregistered = InfoService.getisregistered();
info.completed = InfoService.getCompleted();
info.first =  InfoService.getfirst();
info.last = InfoService.getlast();
info.email = InfoService.getemail();
info.phone = InfoService.getphone();
info.menuitem = InfoService.getmenuitem();

info.submit = function (){
console.log("sdadsd");

};

};


RegistrationController.$inject = ['$http','InfoService'];
function RegistrationController($http,InfoService) {
  var reg = this;

  reg.completed = "COMPLETED";
  reg.submit = function () {

        console.log("clicked");

        var short = reg.user.menuitem;
        console.log(short);
          var promise = $http({
            method: "GET",
            url: ("https://mina-coursera.herokuapp.com/menu_items/"+short+".json"),
          });

          promise.then(function (response) {

              var items = response.data;

              console.log(items);



  reg.completed = true;
  InfoService.setCompleted(true);
    InfoService.setfirst(reg.user.username);
      InfoService.setlast(reg.user.lastname);
        InfoService.setemail(reg.user.email);
          InfoService.setphone(reg.user.phone);
            InfoService.setmenuitem(reg.user.menuitem);
            InfoService.setisregistered(false);






          })
          .catch(function (error) {
console.log("eroooooorrrr");

                          reg.completed = false;
                          InfoService.setCompleted(false);
                          InfoService.setisregistered(true);
          })




  };
};

config.$inject = ['$urlRouterProvider'];
function config($urlRouterProvider) {

  // If user goes to a path that doesn't exist, redirect to public root
  $urlRouterProvider.otherwise('/');
}

function InfoService() {
var service = this;
var completed = "";
var first = "";
var last = "";
var email = "";
var phone = "";
var menuitem = "";
var isregistered = true;




service.getCompleted = function () {
  return completed;
};
service.setCompleted = function (val) {
  completed = val;
};

service.getfirst = function () {
  return first;
};
service.setfirst = function (val) {
  first = val;
};

service.getlast = function () {
  return last;
};
service.setlast = function (val) {
  last = val;
};

service.getemail = function () {
  return email;
};
service.setemail = function (val) {
  email = val;
};

service.getphone = function () {
  return phone;
};
service.setphone = function (val) {
  phone = val;
};

service.getmenuitem = function () {
  return menuitem;
};
service.setmenuitem = function (val) {
  menuitem = val;
};

service.setisregistered = function(val){

isregistered = val;
};

service.getisregistered = function () {
  return isregistered;
};




};

})();
