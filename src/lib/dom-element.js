define(['src/lib/event-emitter', 'src/lib/dom-listener'], function(EventEmitter, DOMListener) {
	'use strict';

	function DOMElement(element) {
		this.element = element;
	}

	DOMElement.create = function(tag, id, attributes) {
		var element = document.createElement(tag || 'DIV');
		element.setAttribute('id', id || '');
		for (var attribute in attributes) {
			if (attributes.hasOwnProperty(attribute)) {
				element.setAttribute(attribute, attributes[attribute]);
			}
		}
		element.style.display = 'none';

		return new DOMElement(element);
	};

	DOMElement.prototype = new EventEmitter();

	DOMElement.prototype.prepend = function(target) {
		target.insertBefore(this.element, target.firstChild);
		return this;
	};

	DOMElement.prototype.append = function(target) {
		target.appendChild(this.element);
		return this;
	};

	DOMElement.prototype.remove = function() {
		this.element.parentNode.removeChild(this.element);
		return this;
	};

	DOMElement.prototype.show = function() {
		this.element.style.display = 'block';
		this.emit('show');
		return this;
	};

	DOMElement.prototype.hide = function() {
		this.element.style.display = 'none';
		this.emit('hide');
		return this;
	};

	DOMElement.prototype.isVisible = function() {
		return this.element.style.display !== 'none';
	};

	DOMElement.prototype.toggle = function() {
		if (this.isVisible()) {
			return this.hide();
		} else {
			return this.show();
		}
	};

	DOMElement.prototype.listen = function() {
		return new DOMListener(this.element, arguments).proxy(this);
	};

	return DOMElement;

});