define(['lib/event-emitter'], function(EventEmitter) {
	'use strict';

	function Modal(element) {
		this.element = element;
	}

	Modal.prototype = new EventEmitter();

	Modal.prototype.createElement = function() {
		var element = document.createElement('div');
		element.setAttribute('id', 'valet-io-modal');
		document.body.insertBefore(element, document.body.firstChild);
		this.emit('element', element);
		return element;
	}

	return Modal;
});