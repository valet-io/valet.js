define(['src/lib/event-emitter', 'src/shims/function/bind'], function(EventEmitter) {
	'use strict';

	function DOMListener(element, events) {
		if (!(events instanceof Array)) {
			events = Array.prototype.slice.call(arguments, 1);
		}
		this.element = element;
		this.events = events;

		for (var i = 0; i < this.events.length; i += 1) {
			var event = this.events[i];
			if (element.addEventListener) {
				element.addEventListener(event, this.handle(event), false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + event, this.handle(event));
			}
		}
	}

	DOMListener.prototype = new EventEmitter();

	DOMListener.prototype.handle = function(name) {
		return function(event) {
			if (!this.filter || (this.filter && this.filter(event))) {
				this.emit(name, event);
			};
		}.bind(this);
	};

	return DOMListener;
});