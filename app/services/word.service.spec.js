describe('word service', function() {
  'use strict';

  var wordService;
  var initInfo;
  var initArr;

  beforeEach(module('narrWordGame.core'));
  beforeEach(inject(function(_wordService_) {
    wordService = _wordService_;
    initInfo = wordService.getInfo();
    initArr = wordService.getWords();
  }));

  it('should add the number of a delete count to the word array if there is ' +
    'a delete count when "getWords" method is executed',
    function() {
      var deleteCount = 8;
      var initArrLen = initArr.length;
      wordService.getWords(deleteCount);

      var subject = initArr.length;
      var result = initArrLen + deleteCount;

      expect(subject).toEqual(result);
    });

  it('should set a correct prop of a word when "update" is called',
    function() {
      var activeIndex = initInfo.activeIndex;
      var trialCount = initInfo.trialCount;
      var idx = 4;
      var isCorrect = false;
      wordService.update(idx, isCorrect);

      var subject = initArr[activeIndex].correct;
      var subject2 = initInfo.activeIndex;
      var subject3 = initInfo.trialCount;

      var result = isCorrect;
      var result2 = idx;
      var result3 = trialCount + 1;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
      expect(subject3).toEqual(result3);


      var correctCount = initInfo.correctCount;
      wordService.update(idx + 1, true);

      var subject4 = initInfo.correctCount;
      var result4 = correctCount + 1;

      expect(subject4).toEqual(result4);
    });

  it('should have the same number of array items before and after when ' +
    '"setWords" is called',
    function() {
      var initArrLen = initArr.length;
      wordService.setWords(14);

      var subject = initArr.length;
      var result = initArrLen;
      expect(subject).toEqual(result);
    });

  it('should have the same number of array items before and after when ' +
    '"setWords" is called and initialize the word info',
    function() {
      initInfo.activeIndex = 10;
      initInfo.trialCount = 24;
      initInfo.correctCount = 14;
      var initArrLen = initArr.length;
      wordService.getWords(8);

      wordService.resetWords(14);

      var subject = initArr.length;
      var subject2 = initInfo.activeIndex;
      var subject3 = initInfo.trialCount;
      var subject4 = initInfo.correctCount;
      var result = initArrLen;
      var result2 = 0;
      var result3 = 0;
      var result4 = 0;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
      expect(subject3).toEqual(result3);
      expect(subject4).toEqual(result4);
    });
});
