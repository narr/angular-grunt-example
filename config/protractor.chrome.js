// https://github.com/angular/protractor/blob/master/docs/referenceConf.js
(function() {
  'use strict';

  var SpecReporter = require('jasmine-spec-reporter');

  var configObj = {
    baseUrl: 'http://localhost:8080/',
    capabilities: {
      browserName: 'chrome'
    },
    exclude: [],
    jasmineNodeOpts: {
      // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/docs/protractor-configuration.md
      print: function() {}
    },
    onPrepare: function() {
      // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/docs/protractor-configuration.md
      jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: 'all'
      }));
      browser.driver.manage().window().setSize(1920, 1200);
    },
    specs: [
      '../app/**/*.e2e-spec.js'
    ]
  };

  module.exports.config = configObj;
})();
