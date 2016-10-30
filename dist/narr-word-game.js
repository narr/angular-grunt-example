/*!
 * grunt-angular-example v0.0.1
 * https://github.com/narr/grunt-angular-example
 * Copyright (c) 2016 Narr
 * License: MIT
 */
/* filename: app/app.module.js */ 
(function() {
  'use strict';

  angular
    .module('narrWordGame', [
      'narrWordGame.core',
      'narrWordGame.components'
    ]);

  angular
    .module('narrWordGame.core', [
      'ngAnimate'
    ]);

})();

/* filename: app/app.config.js */ 
// app.config.js

/* filename: app/components/index.js */ 
(function() {
  'use strict';

  angular
    .module('narrWordGame.components', [
      'narrWordGame.core'
    ]);

})();

/* filename: app/components/word-game-view.directive.js */ 
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

/* filename: app/components/word-input.directive.js */ 
(function() {
  'use strict';

  angular
    .module('narrWordGame.components')
    .directive('narrWordInput', wordInput);

  wordInput.$inject = ['$timeout'];

  function wordInput($timeout) {
    var directive = {
      controller: WordInputController,
      controllerAs: 'vm',
      link: linkFunc,
      restrict: 'E',
      scope: {
        onKeypress: '=',
        onCheckValue: '=',
        enable: '=',
        disable: '='
      },
      template: '' +
        '<input type="text" ' +
          'ng-model="vm.val" ' +
          'ng-keypress="vm.onKeypress($event)" ' +
          'ng-disabled="vm.disabled">' +
        '<span class="info-txt">{{vm.infoTxt}}</span>'
    };
    return directive;

    function linkFunc(scope, el, attrs, ctrl) {
      scope.enable = enable;

      function enable() {
        ctrl.disabled = false;
        ctrl.val = '';
        $timeout(function() {
          el.find('input')[0].focus();
        });
      }
    }
  }

  WordInputController.$inject = ['$scope'];

  function WordInputController($scope) {
    var vm = this;
    vm.val = '';
    vm.onKeypress = onKeypress;
    vm.disabled = false;
    vm.infoTxt = 'use space to move to the next word';

    $scope.disable = disable;

    function onKeypress($event) {
      $scope.onKeypress($event);
      if ($event.keyCode === 32) { // space
        $event.preventDefault();
        $scope.onCheckValue(vm.val);
        vm.val = '';
      }
    }

    function disable() {
      vm.disabled = true;
    }
  }

})();

/* filename: app/components/word-panel.directive.js */ 
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

/* filename: app/components/word-timer.directive.js */ 
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

/* filename: app/services/word.service.js */ 
(function() {
  'use strict';

  angular
    .module('narrWordGame.core')
    .factory('wordService', wordService);

  function wordService() {
    var words = [
      'have', 'girl', 'which', 'was', 'first', 'has',
      'know', 'find', 'night', 'next', 'set', 'run',
      'large', 'want', 'go', 'name', 'look', 'which',
      'seem', 'want', 'life', 'water', 'stop', 'it'
    ];

    var info = {
      activeIndex: 0,
      trialCount: 0,
      correctCount: 0
    };
    var wordsArr = [];

    var service = {
      getInfo: getInfo,
      getWords: getWords,
      update: update,
      setWords: setWords,
      resetWords: resetWords
    };
    return service;

    function getInfo() {
      return info;
    }

    function getWords(delCount) {
      var i;
      var len;
      var wordIdx;
      var wordsCount = words.length;
      var initWordsCount = 40;

      if (delCount) {
        len = delCount;
      } else {
        len = initWordsCount;
      }
      for (i = 0; i < len; i++) {
        wordIdx = Math.floor((Math.random() * wordsCount));
        wordsArr.push({
          text: words[wordIdx],
          correct: null
        });
      }
      return wordsArr;
    }

    function update(idx, isCorrect) {
      wordsArr[info.activeIndex].correct = isCorrect;
      info.activeIndex = idx;
      if (isCorrect) {
        info.correctCount++;
      }
      info.trialCount++;
    }

    function setWords(delCount) {
      wordsArr.splice(0, delCount);
      getWords(delCount);
    }

    function resetWords() {
      wordsArr.length = 0;
      getWords();
      info.activeIndex = 0;
      info.trialCount = 0;
      info.correctCount = 0;
    }
  }

})();

/* filename: dist/template.js */ 
angular.module('narrWordGame.components').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/word-game-view.directive.html',
    "<narr-word-panel info=\"vm.wordPanel.info\"\n" +
    "  update-panel=\"vm.wordPanel.updatePanel\"\n" +
    "  reset-panel=\"vm.wordPanel.resetPanel\" ng-class=\"{inactive: vm.isTimeEnd}\">\n" +
    "</narr-word-panel>\n" +
    "<div class=\"game-result\" ng-show=\"vm.isTimeEnd\">\n" +
    "  <span class=\"result-total\">total words: {{vm.wordPanel.info.trialCount}}\n" +
    "  </span>\n" +
    "  <span class=\"result-correct\">correct words:\n" +
    "    {{vm.wordPanel.info.correctCount}}</span>\n" +
    "  <span class=\"result-incorrect\">incorrect words:\n" +
    "    {{vm.wordPanel.info.trialCount - vm.wordPanel.info.correctCount}}</span>\n" +
    "</div>\n" +
    "<narr-word-input on-keypress=\"vm.start\" on-check-value=\"vm.checkVal\"\n" +
    "  enable=\"vm.wordInput.enable\" disable=\"vm.wordInput.disable\">\n" +
    "</narr-word-input>\n" +
    "<narr-word-timer timer-started=\"vm.wordTimer.started\"\n" +
    "  start-timer=\"vm.wordTimer.startTimer\" on-time-end=\"vm.timeEnd\"\n" +
    "  reset-timer=\"vm.wordTimer.resetTimer\"></narr-word-timer>\n" +
    "<button type=\"button\" ng-click=\"vm.reset($event)\">reset</button>\n"
  );


  $templateCache.put('components/word-panel.directive.html',
    "<span ng-repeat=\"word in vm.words track by $index\" ng-class=\"{\n" +
    "  word: true,\n" +
    "  active: vm.info.activeIndex === $index,\n" +
    "  correct: word.correct === true,\n" +
    "  incorrect: word.correct === false\n" +
    "}\">\n" +
    "  {{word.text}}\n" +
    "</span>\n"
  );

}]);

//# sourceMappingURL=narr-word-game.js.map