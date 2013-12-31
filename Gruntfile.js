/*jslint node: true */

module.exports = function(grunt) {
	'use strict';
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var app = {
			build: {
				dir: 'build',
				tmp: '.tmp'
				script: 'valet.js'
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
		}
	});

	grunt.registerTask('prelint', ['jshint:gruntfile', 'jshint:scripts']);
	grunt.registerTask('postlint', ['jshint:output'])
};