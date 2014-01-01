define(function() {
	'use strict';

	return {
		attachListeners: function() {
			var d = document;
			if (d.addEventListener) {
				return d.addEventListener('click', this.handlers.click, false);
			} else if (d.attachEvent) {
				return d.attachEvent('onclick', this.handlers.click);
			}
		},
		handlers: {
			click: function(event) {
				return event;
			}
		}
	};
});