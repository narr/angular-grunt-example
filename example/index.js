(function() {
  'use strict';

  angular
    .module('exampleApp', [
      'narrWordGame'
    ]);

  angular.module('exampleApp')
    .controller('ExampleController', ExampleController);

  ExampleController.$inject = ['$timeout'];

  function ExampleController($timeout) {
    var vm = this;
    vm.txt = 'Word Game Application';

    vm.onClick = onClick;

    function onClick() {
      // console.log('click');
      $timeout(function() {
        vm.txt = 'Performance Test';
      }, 4000);
    }
  }
})();
