module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.repository %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      '<%= pkg.author %>\n' +
      ' * License: <%= pkg.license %>\n */' +
      '\n',

    // Task configuration.
    clean: {
      all: [
        'coverage',
        'dist'
      ],
      dev: [
        'dist/*',
        '!dist/*.min.*'
      ],
      dist: [
        'dist/*.min.*'
      ]
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      config: {
        src: 'config/*.js'
      },
      app: {
        src: [
          'app/**/*.js'
        ]
      }
    },

    ngtemplates: {
      options: {
        module: 'narrWordGame.components'
      },
      dev: {
        cwd: 'app',
        src: 'components/**/*.html',
        dest: 'dist/template.js'
      },
      dist: {
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            keepClosingSlash: false, // Only if you are using SVG in HTML
            removeAttributeQuotes: true,
            removeComments: true, // Only if you don't use comment directives!
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        },
        cwd: 'app',
        src: 'components/**/*.html',
        dest: 'dist/template.min.js'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true,
        process: function(src, filepath) {
          return '/* filename: ' + filepath + ' */ \n' + src;
        }
      },
      css: {
        src: [
          'app/components/word-game-view.css'
        ],
        dest: 'dist/narr-word-game.css',
      },
      js: {
        src: [
          'app/app.module.js',
          'app/app.config.js',
          'app/components/index.js',
          'app/components/**/*.js',
          'app/services/**/*.js',
          '<%= ngtemplates.dev.dest %>',
          '!**/*.spec.js',
        ],
        dest: 'dist/narr-word-game.js',
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      dist: {
        src: '<%= concat.css.dest %>',
        dest: 'dist/narr-word-game.min.css'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true
      },
      dist: {
        src: [
          'app/app.module.js',
          'app/app.config.js',
          'app/components/index.js',
          'app/components/**/*.js',
          'app/services/**/*.js',
          '<%= ngtemplates.dist.dest %>',
          '!**/*.spec.js',
        ],
        dest: 'dist/narr-word-game.min.js',
      }
    },
  });

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', function() {
    console.log('default task..!!'); // jshint devel:true
  });
  grunt.registerTask('dev', [
    'clean:dev', 'ngtemplates:dev', 'concat'
  ]);
  grunt.registerTask('dist', [
    'jshint', 'clean:dist', 'cssmin', 'ngtemplates:dist', 'uglify'
  ]);
};
