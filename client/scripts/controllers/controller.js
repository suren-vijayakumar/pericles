//All the controllers here

var app = angular.module('tasksApp');

//Controllers for the Homepage
app.controller('HomeController', ['$scope', '$http',function($scope,$http){
    $scope.thing = "Its is a fun speaking game that helps your public speaking skills";


}]);

//This is the controller for the Crutch words
app.controller('CrutchController', ['$scope', function($scope, $http){
    $scope.thing = "No more um-ah's!";

}]);

//Controller for the Grammarian
app.controller('GrammarController', ['$scope','$http', function($scope, $http){
    $scope.thing = "There's more room for proper Grammar!";
    $scope.comment = [];

    $scope.btn_add = function() {
        if($scope.txtcomment !=''){
        $scope.comment.push($scope.txtcomment);
        $scope.txtcomment = "";
        }
    };

    $scope.remItem = function($index) {
        $scope.comment.splice($index, 1);
    };

    //Eventually save it to the database

    $scope.updateGrammar = function(sessionID, txtcomment){
        $http.put('/getsessions/' + sessionID, {"grammar": txtcomment})
            .success(function(data) {
                $scope.session = {};
                $scope.sessions = data;
                console.log("got to updateGrammar");
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
}]);


// The timer controller
app.controller('TimerController', ['$scope', function($scope){
    //$scope.stopwatches = [{ log: []},{interval: 1000, log: []},{interval: 2000, log: []}];
    $scope.stopwatches = [{ log: []}];
}])
.filter('stopwatchTime', function () {
    return function (input) {
        if(input){

            var elapsed = input.getTime();
            var hours = parseInt(elapsed / 3600000,10);
            elapsed %= 3600000;
            var mins = parseInt(elapsed / 60000,10);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000,10);
            var ms = elapsed % 1000;

            //return hours + ':' + mins + ':' + secs + ':' + ms;
            return mins + ':' + secs;
        }
    };
})
.directive('bbStopwatch', ['StopwatchFactory', function(StopwatchFactory){
    return {
        restrict: 'EA',
        scope: true,
        link: function(scope, elem, attrs){

            var stopwatchService = new StopwatchFactory(scope[attrs.options]);

            scope.startTimer = stopwatchService.startTimer;
            scope.stopTimer = stopwatchService.stopTimer;
            scope.resetTimer = stopwatchService.resetTimer;

        }
    };
}])
.factory('StopwatchFactory', ['$interval',    function($interval){

    return function(options){

        var startTime = 0,
            currentTime = null,
            offset = 0,
            interval = null,
            self = this;

        if(!options.interval){
            options.interval = 100;
        }

        options.elapsedTime = new Date(0);

        self.running = false;

        function pushToLog(lap){
            if(options.log !== undefined){
               options.log.push(lap);
            }
        }

        self.updateTime = function(){
            currentTime = new Date().getTime();
            var timeElapsed = offset + (currentTime - startTime);
            options.elapsedTime.setTime(timeElapsed);
        };

        self.startTimer = function(){
            if(self.running === false){
                startTime = new Date().getTime();
                interval = $interval(self.updateTime,options.interval);
                self.running = true;
            }
        };

        self.stopTimer = function(){
            if( self.running === false) {
                return;
            }
            self.updateTime();
            offset = offset + currentTime - startTime;
            pushToLog(currentTime - startTime);
            $interval.cancel(interval);
            self.running = false;
        };

        self.resetTimer = function(){
          startTime = new Date().getTime();
          options.elapsedTime.setTime(0);
          timeElapsed = offset = 0;
        };

        self.cancelTimer = function(){
          $interval.cancel(interval);
        };

        return self;

    };


}]);