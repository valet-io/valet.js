define(['src/lib/event-emitter', 'src/lib/dom-listener', 'src/lib/template', 'src/shims/function/bind'], function(EventEmitter, DOMListener, template) {
	'use strict';

	function UIElement(tag, id, attributes) {
		this.element = this.createElement(tag, id, attributes);
		EventEmitter.call(this);
	}

	UIElement.prototype = Object.create(EventEmitter.prototype);

	UIElement.prototype.createElement = function(tag, id, attributes) {
		var element = document.createElement(tag || 'DIV');
		element.setAttribute('id', id || '');
		for (var attribute in attributes) {
			if (attributes.hasOwnProperty(attribute)) {
				element.setAttribute(attribute, attributes[attribute]);
			}
		}
		element.style.display = 'none';

		return element;
	};

	// Insertion/removal of elements

	UIElement.prototype.prepend = function(target) {
		target.insertBefore(this.element, target.firstChild);
		return this;
	};

	UIElement.prototype.append = function(target) {
		target.appendChild(this.element);
		return this;
	};

	UIElement.prototype.insertBefore = function(sibling) {
		sibling.parentNode.insertBefore(this.element, sibling);
		return this;
	};

	UIElement.prototype.insertAfter = function(sibling) {
		sibling.parentNode.insertBefore(this.element, sibling.nextSibling);
		return this;
	};

	UIElement.prototype.remove = function() {
		this.element.parentNode.removeChild(this.element);
		return this;
	};

	// Visibility

	UIElement.prototype.show = function() {
		this.element.style.display = 'block';
		this.emit('show');
		return this;
	};

	UIElement.prototype.hide = function() {
		this.element.style.display = 'none';
		this.emit('hide');
		return this;
	};

	UIElement.prototype.isVisible = function() {
		return this.element.style.display !== 'none';
	};

	UIElement.prototype.toggle = function() {
		if (this.isVisible()) {
			return this.hide();
		} else {
			return this.show();
		}
	};

	// Loading template

	UIElement.prototype.load = function(data, callback) {
		template.fetch(this.templateName, data, function(err, template) {
			if (!err) {
				this.element.innerHTML = template;
				this.emit('ready');
			}
			callback.call(this, err);
		}.bind(this));
	};

	// DOM Events

	UIElement.prototype.listen = function() {
		return new DOMListener(this.element, arguments).proxy(this);
	};

	return UIElement;

});