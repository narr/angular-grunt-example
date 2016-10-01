// http://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function(config) {
  'use strict';

  var processArgv = process.argv.join('');

  var configObj = {
    basePath: '../',
    browsers: [
      'PhantomJS',
    ],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'text'
      }]
    },
    // exclude: [],
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/**/*.html',
      'app/**/*.css', // to apply css
      'app/**/*.js'
    ],
    frameworks: ['jasmine'],
    // logLevel: config.LOG_INFO,
    ngHtml2JsPreprocessor: {
      // strip app from the file path
      stripPrefix: 'app/',
      //  stripSuffix: '.ext',
      // prependPrefix: 'served/',
      moduleName: 'narrWordGame.html' // module for htmls
    },
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher',
    ],
    preprocessors: {
      'app/**/!(*spec).js': ['coverage'],
      'app/**/*.html': ['ng-html2js']
    },
    reporters: ['mocha', 'coverage']
  };

  if (processArgv.indexOf('--single-run') > -1) {
    // add 'html' coverage reporter
    configObj.coverageReporter.reporters.push({
      type: 'html'
    });
  }

  config.set(configObj);
};
