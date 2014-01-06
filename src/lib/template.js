define(['require', 'text'], function(require) {
	'use strict';
	return function template(name, callback) {
		var htmlPath = 'templates/html/' + name + '.html',
		cssPath = 'templates/styles/' + name + '.css';
		require(['text!' + htmlPath, 'text!' + cssPath], function(markup, styles) {
			var template = '<style>' + styles + '</style>' + markup;
			callback(null, template);
		}, function(error) {
			callback(error);
		});
	};
});