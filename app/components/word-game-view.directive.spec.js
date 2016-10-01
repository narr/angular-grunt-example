describe('word-game-view directive', function() {
  'use strict';

  var $compile;
  var $rootScope;

  // Load the narrWordGame.components module, which contains the directive
  beforeEach(module('narrWordGame.components'));
  // narrWordGame.html for karma: ngHtml2JsPreprocessor module
  beforeEach(module('narrWordGame.html'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around
    // the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should have "<narr-word-panel>" tag as a child', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<narr-word-game-view></narr-word-game-view>')
      ($rootScope);

    $rootScope.$digest();

    var subject = element.find('narr-word-panel').length;
    var result = 1;

    expect(subject).toEqual(result);
  });

  it('when a method is executed, each callback should be called', function() {
    var element = $compile('<narr-word-game-view></narr-word-game-view>')
      ($rootScope);

    $rootScope.$digest();

    var ctrl = element.controller('narrWordGameView');

    var subject;
    var subject2;
    var subject3;
    var subject4;
    var subject5;
    var subject6;
    var subject7;
    var subject8;

    var result = 'subject1';
    var result2 = 'subject2';
    var result3 = 'subject3';
    var result4 = 'subject4';
    var result5 = 'subject5';
    var result6 = 'subject6';
    var result7 = true;
    var result8 = false;

    ctrl.wordTimer.startTimer = function() {
      subject = 'subject1';
    };
    ctrl.wordTimer.resetTimer = function() {
      subject2 = 'subject2';
    };

    ctrl.wordPanel.updatePanel = function(val) {
      subject3 = val;
    };
    ctrl.wordPanel.resetPanel = function() {
      subject4 = 'subject4';
    };

    ctrl.wordInput.disable = function() {
      subject5 = 'subject5';
    };
    ctrl.wordInput.enable = function() {
      subject6 = 'subject6';
    };

    ctrl.start();
    ctrl.checkVal(result3);
    ctrl.timeEnd();

    subject7 = ctrl.isTimeEnd;

    expect(subject).toEqual(result);
    expect(subject3).toEqual(result3);
    expect(subject5).toEqual(result5);
    expect(subject7).toEqual(result7);

    // ctrl.reset();
    element.find('button').triggerHandler('click');

    subject8 = ctrl.isTimeEnd;

    expect(subject2).toEqual(result2);
    expect(subject4).toEqual(result4);
    expect(subject6).toEqual(result6);
    expect(subject8).toEqual(result8);
  });
});
