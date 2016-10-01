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
