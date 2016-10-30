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
