var app = angular.module('tasksApp', ['ngMaterial','ngRoute']);

//This is the master controller for the sidebar

app.controller('AppCtrl', ['$http','$scope', '$mdSidenav', 'taskService', '$timeout', '$log', '$location', function($http,$scope, $mdSidenav, taskService, $timeout, $log, $location) {
  var alltasks = [];

  $scope.selected = null;
  $scope.tasks = alltasks;
  $scope.selecttask = selecttask;
  $scope.toggleSidenav = toggleSidenav;

  loadtasks();

  function loadtasks() {
    taskService.loadAll()
      .then(function(tasks) {
        alltasks = tasks;
        $scope.tasks = [].concat(tasks);
        $scope.selected = $scope.tasks[0];
      })
  }

  function toggleSidenav(name) {
    $mdSidenav(name).toggle();
  }

  function selecttask(task) {
    $scope.selected = angular.isNumber(task) ? $scope.tasks[task] : task;
    console.log($scope.selected.url);
    $scope.toggleSidenav('left');
    console.log(task.templateUrl);
    $location.path(task.templateUrl);

  }

        $scope.speaker = {};
        $scope.speakers = [];

        $scope.getData = function() {

        console.log('getdata');
        return $http.get("/getusers").then(function(response){
           if(response.status != 200) {
               throw new Error("failed to load users.");
           }
            $scope.speaker = {};
            $scope.speakers = response.data;
           console.log(response);
            return response.data;

        });


    }
     $scope.getData();

        $scope.session = {};
        $scope.sessions = [];

        $scope.getSession = function() {

        console.log('getsession');

        return $http.get("/getsessions").then(function(res){
           if(res.status != 200) {
               throw new Error("failed to load sessions.");
           }
            $scope.session = {};
            $scope.sessions = res.data;
           console.log(res);
            return res.data;

        });


    }
     $scope.getSession();


    //$scope.updateGrammar = function(sessionID, grammarReview){
    //    $http.put('/getsessions/' + sessionID, {"grammar": grammarReview})
    //        .success(function(data) {
    //            $scope.session = {};
    //            $scope.sessions = data;
    //            console.log(data);
    //        })
    //        .error(function(error) {
    //            console.log('Error: ' + error);
    //        });
    //};

}]);


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/assets/views/routes/about.html",
            controller: "HomeController"
        }).
         when('/timer', {
            templateUrl: "/assets/views/routes/timer.html",
            controller: "TimerController"

        }).
         when('/grammar', {
            templateUrl: "/assets/views/routes/grammar.html",
            controller: "GrammarController"
        }).
         when('/crutch', {
            templateUrl: "/assets/views/routes/crutch.html",
            controller: "CrutchController"
        }).
          otherwise({
                 redirectTo:"/home"
             })

}]);

app.service('taskService', ['$q', '$sce', function($q, $sce) {
  var tasks = [ {
    name: 'Home',
    iconurl: 'http://www.glossophilia.org/wp-content/uploads/home.png',
    templateUrl: "home"
  }, {
    name: 'Timer',
    iconurl: 'http://www.techspot.com/images2/downloads/topdownload/2014/12/alarmclock.png',
    templateUrl: "timer"
  }, {
    name: 'Crutch Word',
    iconurl: 'http://www.bettercommunicator.ca/wp-content/uploads/2015/01/eliminate-crutch-words_feature.png',
    templateUrl: "crutch"
  },
  {
    name: 'Grammarian',
    iconurl: 'http://graphics8.nytimes.com/images/2010/03/03/learning/grammarcartoon/grammarcartoon-blogSpan.jpg',
    templateUrl: "grammar"
  }];

  return {
    loadAll: function() {
      return $q.when(tasks);
    }
  };
}]);




