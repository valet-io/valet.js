define(['src/ui-controllers/modal', 'src/config'], function(Modal, config) {
	'use strict';
	var modal = new Modal(config.modal).load();

	var methods = ['show', 'hide', 'toggle', 'isVisible', 'on'];
	var api = {};

	for (var i = 0; i < methods.length; i += 1) {
		var method = methods[i];
		/*jshint loopfunc: true*/
		api[method] = function() {
			return modal[method].apply(modal, Array.prototype.slice.call(arguments, 0));
		};
	}

	return api;
});