define(['src/lib/event-emitter', 'src/lib/dom-listener', 'src/lib/template', 'src/shims/function/bind'], function(EventEmitter, DOMListener, template) {
	'use strict';

	function UIElement(element) {
		this.element = element;
	}

	UIElement.create = function(tag, id, attributes) {
		var element = document.createElement(tag || 'DIV');
		element.setAttribute('id', id || '');
		for (var attribute in attributes) {
			if (attributes.hasOwnProperty(attribute)) {
				element.setAttribute(attribute, attributes[attribute]);
			}
		}
		element.style.display = 'none';

		return new UIElement(element);
	};

	UIElement.prototype = new EventEmitter();

	// Insertion/removal of elements

	UIElement.prototype.prepend = function(target) {
		target.insertBefore(this.element, target.firstChild);
		return this;
	};

	UIElement.prototype.append = function(target) {
		target.appendChild(this.element);
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
		template(this.templateName, data, function(err, template) {
			if (!err) {
				this.element.innerHTML = template;
				this.emit('ready');
			}
			callback(err);
		}.bind(this));
	};

	// DOM Events

	UIElement.prototype.listen = function() {
		return new DOMListener(this.element, arguments).proxy(this);
	};

	return UIElement;

});