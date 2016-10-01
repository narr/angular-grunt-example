(function() {
  'use strict';

  angular
    .module('narrWordGame.components')
    .directive('narrWordGameView', wordGameView);

  function wordGameView() {
    var directive = {
      controller: WordGameViewController,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: 'components/word-game-view.directive.html'
    };
    return directive;
  }

  function WordGameViewController() {
    var vm = this;
    vm.start = start;
    vm.checkVal = checkVal;
    vm.timeEnd = timeEnd;
    vm.reset = reset;
    vm.isTimeEnd = false;

    vm.wordPanel = {};
    vm.wordInput = {};
    vm.wordTimer = {};

    function start($event) {
      vm.wordTimer.startTimer();
    }

    function checkVal(val) {
      vm.wordPanel.updatePanel(val);
    }

    function timeEnd() {
      vm.isTimeEnd = true;
      vm.wordInput.disable();
    }

    function reset($event) {
      vm.isTimeEnd = false;
      vm.wordPanel.resetPanel();
      vm.wordTimer.resetTimer();
      vm.wordInput.enable();
    }
  }

})();
