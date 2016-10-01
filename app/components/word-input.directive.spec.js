describe('word-input directive', function() {
  'use strict';

  var $compile;
  var $rootScope;
  var $timeout;

  beforeEach(module('narrWordGame.components'));
  beforeEach(module('narrWordGame.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  it('should have an input tag and a span tag as children', function() {
    var element = $compile('<narr-word-input on-keypress="a" ' +
      'on-check-value="b" enable="c" disable="d">')($rootScope);
    $rootScope.$digest();

    var subject = element.find('input').length;
    var subject2 = element.find('span').length;
    var result = 1;
    var result2 = 1;

    expect(subject).toEqual(result);
    expect(subject2).toEqual(result2);
  });

  it('when the enable method is executed, enable an input and initialize ' +
    'its value',
    function() {
      $rootScope.wordInput = {};

      var element = $compile('<narr-word-input on-keypress="a" ' +
          'on-check-value="b" enable="wordInput.enable" disable="d">')
        ($rootScope);
      $rootScope.$digest();

      var ctrl = element.controller('narrWordInput');
      ctrl.disabled = true;
      ctrl.val = 'test input';
      $rootScope.wordInput.enable();

      var inputEl = element.find('input')[0];
      spyOn(inputEl, 'focus');
      $timeout.flush();

      var subject = ctrl.disabled;
      var subject2 = ctrl.val;
      var subject3 = inputEl.focus;
      var result = false;
      var result2 = '';

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
      expect(subject3).toHaveBeenCalled();
    });


  describe('a keypress event', function() {
    it('when a key is pressed in the input, the callback should be called',
      function() {
        var keycode;
        $rootScope.keypressTest = function(e) {
          keycode = e.keyCode;
        };

        var element = $compile('<narr-word-input on-keypress="keypressTest" ' +
          'on-check-value="b" enable="c" disable="d">')($rootScope);
        $rootScope.$digest();

        var pressedKeyCode = 8; // backspace
        element.find('input').triggerHandler({
          type: 'keypress',
          keyCode: pressedKeyCode
        });

        var subject = keycode;
        var result = pressedKeyCode;

        expect(subject).toEqual(result);
      });

    it('when a keycode is not "Space", the evnet should not be prevented ' +
      'and input value should not change',
      function() {
        var event;
        $rootScope.keypressTest = function(e) {
          event = e;
        };
        $rootScope.checkValTest = function(val) {};

        var element = $compile('<narr-word-input on-keypress="keypressTest" ' +
          'on-check-value="checkValTest" enable="c" disable="d">')($rootScope);
        $rootScope.$digest();
        var ctrl = element.controller('narrWordInput');

        var testVal = ctrl.val = 'test value';
        var keyCode = 65; // a
        element.find('input').triggerHandler({
          type: 'keypress',
          keyCode: keyCode
        });

        var subject = event.isDefaultPrevented();
        var subject2 = ctrl.val;
        var result = false;
        var result2 = testVal;

        expect(subject).toEqual(result);
        expect(subject2).toEqual(result2);
      });

    it('when a keycode is "Space", the evnet should be prevented and ' +
      'input value should be reset',
      function() {
        var event;
        $rootScope.keypressTest = function(e) {
          event = e;
        };
        var inputVal;
        $rootScope.checkValTest = function(val) {
          inputVal = val;
        };

        var element = $compile('<narr-word-input on-keypress="keypressTest" ' +
          'on-check-value="checkValTest" enable="c" disable="d">')($rootScope);
        $rootScope.$digest();
        var ctrl = element.controller('narrWordInput');

        var testVal = ctrl.val = 'test value';
        var keyCode = 32; // space
        element.find('input').triggerHandler({
          type: 'keypress',
          keyCode: keyCode
        });

        var subject = event.isDefaultPrevented();
        var subject2 = inputVal;
        var subject3 = ctrl.val;
        var result = true;
        var result2 = testVal;
        var result3 = '';

        expect(subject).toEqual(result);
        expect(subject2).toEqual(result2);
        expect(subject3).toEqual(result3);
      });
  });

  it('when the disable method is executed, change the disable value to true',
    function() {
      $rootScope.wordInput = {};

      var element = $compile('<narr-word-input on-keypress="a" ' +
          'on-check-value="b" enable="c" disable="wordInput.disable">')
        ($rootScope);
      $rootScope.$digest();

      var ctrl = element.controller('narrWordInput');
      ctrl.disabled = false;
      $rootScope.wordInput.disable();

      var subject = ctrl.disabled;
      var result = true;

      expect(subject).toEqual(result);
    });
});
