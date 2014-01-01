/*jslint node: true */

module.exports = function(grunt) {
	'use strict';
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var app = {
			build: {
				dir: 'build',
				tmp: '.tmp',
				script: 'valet.js',
				style:  'valet.css'
			}
		};

	app.build.js = app.build.dir + '/' + app.build.script;
	app.build.css = app.build.dir + '/' + app.build.style;

	grunt.initConfig({
		app: app,
		jshint: {
			options: {
				jshintrc: '.jshintrc',
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			scripts: {
				src: ['src/**/*.js']
			},
			output: {
				src: '<%= app.build.js %>'
			}
		},
		karma: {
			options: {
				runnerPort: 9876,
				files: [
					{pattern: 'src/**/*.js', included: false},
					{pattern: 'test/**/*.spec.js', included: false},
					'test/setup.js'
				],
				exclude: ['src/initialize.js'],
				frameworks: ['mocha', 'requirejs', 'expect', 'sinon'],
				preprocessors: {
					'test/html/*.html': ['html2js']
				}
			},
			development: {
				browsers: ['PhantomJS'],
				background: true
			}
		},
		watch: {
			karma: {
				files: ['src/**/*.js', 'test/**/*.spec.js'],
				tasks: ['karma:development:run']
			}
		}
	});

	grunt.registerTask('lint:pre', ['jshint:gruntfile', 'jshint:scripts']);
	grunt.registerTask('lint:post', ['jshint:output']);

	grunt.registerTask('watch:development', ['karma:development:start', 'watch:karma']);
};