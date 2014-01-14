// Karma configuration
// Generated on Tue Jan 14 2014 14:35:23 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha', 'requirejs', 'expect', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'test/**/*.spec.js', included: false},
      {pattern: 'components/**/*.js', included: false},
      {pattern: 'templates/**/*.hbs', included: false},
      {pattern: 'templates/**/*.styl', included: false},
      {pattern: 'test/integration/html/*.html', included: false},
      {pattern: 'test/integration/**/*.js', included: false},
      {pattern: 'test/stubs/**/*.js', included: false},
      'test/setup.js'
    ],


    // list of files to exclude
    exclude: [
        'src/initialize.js'
    ],

    preprocessors: {
        'templates/**/*.styl': ['stylus']
    },

    stylusPreprocessor: {
        options: {
            paths: ['styles']
        }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
