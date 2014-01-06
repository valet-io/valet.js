define(['src/lib/event-emitter', 'src/lib/template', 'src/shims/function/bind'], function(EventEmitter, template) {
	'use strict';

	function Modal(element) {
		this.element = element;
	}

	Modal.prototype = new EventEmitter();

	Modal.prototype.createElement = function() {
		var element = document.createElement('div');
		element.setAttribute('id', 'valet-io-modal-container');
		element.style.display = 'none';
		document.body.insertBefore(element, document.body.firstChild);
		this.emit('element', element);
		return element;
	};

	Modal.prototype.load = function(callback) {
		template('modal', function(err, template) {
			if (!err) {
				this.element.innerHTML = template;
				this.emit('loading');
			}
			callback();
		}.bind(this));
	};

	Modal.prototype.show = function() {
		this.element.style.display = 'block';
	};

	Modal.prototype.hide = function() {
		this.element.style.display = 'none';
	};

	return Modal;
});