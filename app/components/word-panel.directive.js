(function() {
  'use strict';

  angular
    .module('narrWordGame.components')
    .directive('narrWordPanel', wordPanel);

  function wordPanel() {
    var directive = {
      controller: WordPanelController,
      controllerAs: 'vm',
      link: linkFunc,
      restrict: 'E',
      scope: {
        info: '=',
        updatePanel: '=',
        resetPanel: '='
      },
      templateUrl: 'components/word-panel.directive.html',
    };
    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      scope.updatePanel = updatePanel;

      function updatePanel(inputVal) {
        var wordEls = el[0].querySelectorAll('.word');
        var idx = ctrl.info.activeIndex;
        var isCorrect = wordEls[idx].textContent.trim() === inputVal;
        var offsetTop = wordEls[idx].offsetTop;
        var nextOffsetTop = wordEls[idx + 1].offsetTop;
        if (offsetTop < nextOffsetTop) {
          ctrl.setActiveIndex(isCorrect);
        } else {
          ctrl.increaseIndex(isCorrect);
        }
      }
    }
  }

  WordPanelController.$inject = ['$scope', 'wordService'];

  function WordPanelController($scope, wordService) {
    var vm = this;
    var currentRow = 0;
    var firstRowCount = 1;
    var secondRowCount = 0;

    vm.words = wordService.getWords();
    vm.info = $scope.info = wordService.getInfo();

    vm.increaseIndex = increaseIndex;
    vm.setActiveIndex = setActiveIndex;

    $scope.resetPanel = resetPanel;

    function increaseIndex(isCorrect) {
      if (currentRow === 0) {
        firstRowCount++;
      } else { // 1
        secondRowCount++;
      }
      wordService.update(vm.info.activeIndex + 1, isCorrect);
    }

    function setActiveIndex(isCorrect) {
      var idx;
      if (currentRow === 0) {
        currentRow++;
        secondRowCount = 1;
        idx = vm.info.activeIndex + 1;
        wordService.update(idx, isCorrect);
      } else {
        idx = secondRowCount;
        wordService.update(idx, isCorrect);
        wordService.setWords(firstRowCount);
        firstRowCount = secondRowCount;
        secondRowCount = 1;
      }
    }

    function resetPanel() {
      currentRow = 0;
      firstRowCount = 1;
      secondRowCount = 0;
      wordService.resetWords();
    }
  }

})();
