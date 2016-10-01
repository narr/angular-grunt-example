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
