(function() {
  'use strict';

  angular
    .module('exampleApp', [
      'narrWordGame'
    ]);

  angular.module('exampleApp')
    .controller('ExampleController', function() {
      var vm = this;
      vm.txt = 'Word Game Application';
    });
})();
