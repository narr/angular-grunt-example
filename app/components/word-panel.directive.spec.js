describe('word-panel directive', function() {
  'use strict';

  var $compile;
  var $rootScope;
  var wordService;

  beforeEach(module('narrWordGame.components'));
  beforeEach(module('narrWordGame.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _wordService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    wordService = _wordService_;
  }));

  it('should have the same number of span tags like a number of words and ' +
    'have the same text and "correct" class',
    function() {
      var element = $compile('<narr-word-panel info="a" update-panel="b" ' +
          'reset-panel="c" ng-class="{inactive: d}"></narr-word-panel>')
        ($rootScope);

      wordService.getWords = function() {
        return [{
          text: 'hungry',
          correct: true
        }];
      };

      $rootScope.$digest();

      var span = element.find('span');

      var subject = span.length;
      var subject2 = 'hungry';
      var subject3 = span.hasClass('correct');

      var result = 1;
      var result2 = span.text().trim();
      var result3 = true;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
      expect(subject3).toEqual(result3);
    });

  it('should call setActiveIndex when updatePanel is called and the current ' +
    'span tag\'s offset is different from next one',
    function() {
      var element = $compile('<narr-word-panel info="a" ' +
        'update-panel="updatePanel" reset-panel="b" ' +
        'ng-class="{inactive: c}"></narr-word-panel>')($rootScope);

      angular.element(document).find('body').append(element); // for css

      wordService.getWords = function() {
        return [{
          text: 'hungry',
          correct: null
        }, {
          text: 'hungry-again',
          correct: null
        }];
      };

      $rootScope.$digest();

      var ctrl = element.controller('narrWordPanel');
      var isCorrect;
      ctrl.setActiveIndex = function(_isCorrect) {
        isCorrect = _isCorrect;
      };
      ctrl.increaseIndex = function() {};

      // to make a difference to children's offset
      element[0].style.width = '200px';
      $rootScope.updatePanel('eat');

      var subject = isCorrect;
      var result = false;

      expect(subject).toEqual(result);
    });

  it('should call increaseIndex when updatePanel is called and the current ' +
    'span tag\'s offset is the same',
    function() {
      var element = $compile('<narr-word-panel info="a" ' +
        'update-panel="updatePanel" reset-panel="b" ' +
        'ng-class="{inactive: c}"></narr-word-panel>')($rootScope);

      angular.element(document).find('body').append(element);

      wordService.getWords = function() {
        return [{
          text: 'hungry',
          correct: null
        }, {
          text: 'hungry-again',
          correct: null
        }];
      };

      $rootScope.$digest();

      var ctrl = element.controller('narrWordPanel');
      var isCorrect;
      ctrl.setActiveIndex = function() {};
      ctrl.increaseIndex = function(_isCorrect) {
        isCorrect = _isCorrect;
      };

      $rootScope.updatePanel('hungry');

      var subject = isCorrect;
      var result = true;

      expect(subject).toEqual(result);
    });

  it('should increase a right row count when increaseIndex is called',
    function() {
      var element = $compile('<narr-word-panel info="a" ' +
        'update-panel="b" reset-panel="resetPanel" ' +
        'ng-class="{inactive: d}"></narr-word-panel>')($rootScope);

      var secondRowCount;
      wordService.update = function(idx, isCorrect) {
        secondRowCount = idx;
      };
      var firstRowCount;
      wordService.setWords = function(_firstRowCount) {
        firstRowCount = _firstRowCount;
      };

      $rootScope.$digest();

      var ctrl = element.controller('narrWordPanel');
      ctrl.increaseIndex(false);
      ctrl.setActiveIndex(false);
      ctrl.setActiveIndex(false);

      var subject = firstRowCount;
      var subject2 = secondRowCount;
      var result = 2;
      var result2 = 1;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);


      ctrl.increaseIndex(true);
      ctrl.setActiveIndex(true);

      var subject3 = firstRowCount;
      var subject4 = secondRowCount;
      var result3 = 1;
      var result4 = 2;

      expect(subject3).toEqual(result3);
      expect(subject4).toEqual(result4);


      spyOn(wordService, 'resetWords');
      spyOn(wordService, 'setWords');
      $rootScope.resetPanel();
      ctrl.setActiveIndex(false);

      // wordService.resetWords.calls.reset();

      var subject5 = wordService.resetWords;
      var subject6 = wordService.setWords;

      expect(subject5).toHaveBeenCalled();
      expect(subject6).not.toHaveBeenCalled();
    });
});
