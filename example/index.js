(function() {
  'use strict';

  angular
    .module('exampleApp', [
      'ui.bootstrap',
      'narrWordGame'
    ]);

  angular.module('exampleApp')
    .controller('ExampleController', function() {
      var vm = this;
      vm.txt = 'Word Game Application';
      vm.tooltip = 'Please play game..!!';
      vm.hint = 'Type fast..!!';
    });
})();
