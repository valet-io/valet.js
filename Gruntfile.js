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
				src: ['scripts/*.js']
			},
			output: {
				src: '<%= app.build.js %>'
			}
		},
		karma: {
			options: {
				runnerPort: 9876,
				files: ['scripts/*.js', 'test/*.spec.js'],
				frameworks: ['mocha', 'expect'],
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
				files: ['scripts/*.js', 'test/*.spec.js'],
				tasks: ['karma:development:run']
			}
		}
	});

	grunt.registerTask('prelint', ['jshint:gruntfile', 'jshint:scripts']);
	grunt.registerTask('postlint', ['jshint:output']);

	grunt.registerTask('watch:development', ['jshint:scripts', 'karma:development:start', 'watch:karma']);
};