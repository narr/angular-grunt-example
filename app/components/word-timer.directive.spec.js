describe('word-timer directive', function() {
  'use strict';

  var $compile;
  var $rootScope;
  var $interval;

  beforeEach(module('narrWordGame.components'));
  beforeEach(module('narrWordGame.html'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$interval_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $interval = _$interval_;
  }));

  it('should have "1:00" as an initial time', function() {
    var element = $compile('<narr-word-timer timer-started="a" ' +
        'start-timer="b" on-time-end="c" reset-timer="d"></narr-word-timer>')
      ($rootScope);

    $rootScope.$digest();

    var initTime = element.text();

    var subject = initTime;
    var result = '1:00';

    expect(subject).toEqual(result);
  });

  it('should start timer only if it is not already started', function() {
    var element = $compile('<narr-word-timer timer-started="timerStarted" ' +
      'start-timer="startTimer" on-time-end="c" reset-timer="d">' +
      '</narr-word-timer>')($rootScope);

    $rootScope.$digest();

    var subject = $rootScope.timerStarted;
    var result = false;
    expect(subject).toEqual(result);

    $rootScope.timerStarted = true;
    $rootScope.$digest();
    $rootScope.startTimer();
    var ctrl = element.controller('narrWordTimer');

    var subject2 = ctrl.time;
    var result2 = '1:00';
    expect(subject2).toEqual(result2);

    $rootScope.timerStarted = false;
    $rootScope.$digest();
    $rootScope.startTimer();
    $rootScope.$digest();

    var subject3 = $rootScope.timerStarted;
    var result3 = true;
    expect(subject3).toEqual(result3);
  });

  it('should reset timer only if it is started', function() {
    var element = $compile('<narr-word-timer timer-started="timerStarted" ' +
      'start-timer="b" on-time-end="c" reset-timer="resetTimer">' +
      '</narr-word-timer>')($rootScope);

    $rootScope.$digest();

    var ctrl = element.controller('narrWordTimer');
    ctrl.time = 60;

    $rootScope.resetTimer();

    var subject = ctrl.time;
    var result = 60;
    expect(subject).toEqual(result);

    $rootScope.timerStarted = true;
    $rootScope.$digest();
    $rootScope.resetTimer();

    var subject2 = ctrl.time;
    var result2 = '1:00';
    expect(subject2).toEqual(result2);
  });

  it('should show a right form of time as per time like "0:58, 0:08" and ' +
    'if time is less than 1, should call the "onTimeEnd" callback',
    function() {
      var element = $compile('<narr-word-timer timer-started="timerStarted" ' +
        'start-timer="startTimer" on-time-end="onTimeEnd" reset-timer="' +
        'resetTimer"></narr-word-timer>')($rootScope);

      var timeEndCall;
      $rootScope.onTimeEnd = function() {
        timeEndCall = true;
      };
      $rootScope.$digest();

      var ctrl = element.controller('narrWordTimer');
      $rootScope.startTimer();

      var subject = ctrl.time;
      var result = '0:59';
      expect(subject).toEqual(result);


      $interval.flush(50000);
      var subject2 = ctrl.time;
      var result2 = '0:09';
      expect(subject2).toEqual(result2);


      $interval.flush(9000);
      var subject3 = timeEndCall;
      var result3 = true;
      expect(subject3).toEqual(result3);
    });
});
