(function() {
  'use strict';

  angular
    .module('narrWordGame.components')
    .directive('narrWordTimer', wordTimer);

  function wordTimer() {
    var directive = {
      controller: WordTimerController,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        timerStarted: '=',
        startTimer: '=',
        onTimeEnd: '=',
        resetTimer: '='
      },
      template: '{{vm.time}}',
    };
    return directive;
  }

  WordTimerController.$inject = ['$scope', '$interval'];

  function WordTimerController($scope, $interval) {
    var vm = this;
    var time;
    var timerPromise;

    vm.time = '1:00';

    $scope.timerStarted = false;
    $scope.startTimer = startTimer;
    $scope.resetTimer = resetTimer;

    function startTimer() {
      if (!$scope.timerStarted) {
        $scope.timerStarted = true;
        time = 60;
        timer();
        timerPromise = $interval(timer, 1000);
      }
    }

    function resetTimer() {
      if ($scope.timerStarted) {
        $scope.timerStarted = false;
        $interval.cancel(timerPromise);
        vm.time = '1:00';
      }
    }

    function timer() {
      time--;
      if (time < 10) {
        vm.time = '0:0' + time;
      } else {
        vm.time = '0:' + time;
      }
      if (time < 1) {
        $interval.cancel(timerPromise);
        $scope.onTimeEnd();
      }
    }
  }

})();
