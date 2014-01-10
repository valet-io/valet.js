define(['require', 'text', 'hbs'], function(require) {
	'use strict';
	return function template(name, data, callback) {
		var hbsPath = 'templates/' + name + '/' + name,
		cssPath = 'templates/' + name + '/' + name + '.css';
		require(['hbs!' + hbsPath, 'text!' + cssPath], function(markupTemplate, styles) {
			var markup = markupTemplate(data),
			template = '<style>' + styles + '</style>' + markup;
			callback(null, template);
		}, function(error) {
			callback(error);
		});
	};
});