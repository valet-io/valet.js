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

	var patterns = {
		src: 'src/**/*.js',
		spec: 'test/**/*.spec.js',
		unit: 'test/unit/**/*.spec.js',
		integration: 'test/integration/**/*.spec.js'
	};

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
				src: [patterns.src]
			},
			output: {
				src: '<%= app.build.js %>'
			}
		},
		connect: {
			test: {
				options: {
					base: 'test/integration/html',
					port: 9800
				}
			}
		},
		stylus: {
			development: {
				options: {
					compress: false,
					files: [{
						expand: true,
						cwd: 'styles/',
						src: ['**/*.styl'],
						dest: '.tmp/',
						ext: '.css'
					}]
				}
			}
		},
		watch: {
			karma: {
				files: [patterns.src, patterns.spec],
				tasks: ['karma:unit:run']
			},
		}
	});

	grunt.registerTask('lint:pre', ['jshint:gruntfile', 'jshint:scripts']);
	grunt.registerTask('lint:post', ['jshint:output']);

	grunt.registerTask('development', [
		'lint:pre',
		'karma:unit:start',
		'connect:test',
		'watch:karma'
	]);

};