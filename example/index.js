(function() {
  'use strict';

  angular
    .module('exampleApp', [
      'ngFileUpload'
    ]);


  angular.module('exampleApp')
    .controller('ExampleController', ExampleController);

  ExampleController.$inject = ['$scope', '$timeout', 'Upload'];

  function ExampleController($scope, $timeout, Upload) {
    var vm = this;
    vm.showFileAttachment = false;
    vm.filesArr = [];

    vm.addFile = addFile;

    function addFile($files) {
      vm.filesArr.push($files[0]);
    }

    vm.show = show;

    function show() {
      vm.showFileAttachment = true;
    }

    function init() {
      vm.filesArr = [{
        name: 'test file1.pdf'
      }, {
        name: 'test file2.pdf'
      }];
      vm.showFileAttachment = true;
    }

    init();
  }


  angular
    .module('exampleApp')
    .directive('fa', fa);

  function fa() {
    var directive = {
      restrict: 'A',
      template: '' +
        '<div class="file-attachment-container" ' +
          'ng-if="ex.showFileAttachment">' +
          '<div class="drop-box" ngf-drop="ex.add($files)" ' +
            'ngf-drag-over-class="\'dragover\'">' +
            'Drop pdfs or images here or click to upload</div>' +
          '<span class="text">Files:</span>' +
          '<ul>' +
            '<li class="file text" ng-repeat="f in ex.filesArr" ' +
            'render>{{f.name}}</li>' +
          '</ul>' +
        '</div>',
      replace: true,
      link: faLinkFunc
    };
    return directive;
  }

  function faLinkFunc(scope, el, attrs, ctrl) {
    // console.log(el.find('ul')[0].children.length);
    // console.log(el[0].offsetWidth);
  }

  angular
    .module('exampleApp')
    .directive('render', render);

  function render() {
    var directive = {
      restrict: 'A',
      link: renderLinkFunc,
    };
    return directive;
  }

  function renderLinkFunc(scope, el, attrs, ctrl) {
    console.log(el[0].offsetWidth);
  }
})();
