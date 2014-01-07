define(['require', 'text', 'hbs'], function(require) {
	'use strict';
	return function template(name, data, callback) {
		var hbsPath = 'templates/markup/' + name,
		cssPath = 'templates/styles/' + name + '.css';
		require(['hbs!' + hbsPath, 'text!' + cssPath], function(markupTemplate, styles) {
			var markup = markupTemplate(data),
			template = '<style>' + styles + '</style>' + markup;
			callback(null, template);
		}, function(error) {
			callback(error);
		});
	};
});