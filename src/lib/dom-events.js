define(['./event-emitter'], function(EventEmitter) {
	'use strict';

	function DOMEvents() {}
	DOMEvents.prototype = new EventEmitter();

	DOMEvents.prototype.attachListeners = function() {
		var d = document;
		if (d.addEventListener) {
			return d.addEventListener('click', this, false);
		} else if (d.attachEvent) {
			return d.attachEvent('onclick', this);
		}
	};

	DOMEvents.prototype.handleEvent = function(event) {
		if (event.type === 'click') {
			this.emit('click', event);
		}
	};

	return DOMEvents;
});