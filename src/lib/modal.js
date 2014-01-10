define(['src/lib/event-emitter',
	'src/lib/template',
	'src/lib/dom-listener',
	'src/shims/function/bind'],
	function(EventEmitter, template, DOMListener) {
		'use strict';

		function Modal(element, options) {
			this.element = element;
			this.options = options;
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

		Modal.prototype.destroy = function() {
			document.body.removeChild(this.element);
		};

		Modal.prototype.load = function(callback) {
			template('modal', {
				url: this.options.url + '#page=' + this.options.page
			}, function(err, template) {
					if (!err) {
						this.element.innerHTML = template;
						this.emit('loading');
						this.frame = new DOMListener(window, 'message');
						this.frame.on('message', function(event) {
							this.emit('frame::' + event.data);
						}.bind(this));
						this.on('frame::load', function() {
							this.emit('ready');
						});
					}
					callback(err);
				}.bind(this));
		};

		Modal.prototype.show = function() {
			this.element.style.display = 'block';
		};

		Modal.prototype.hide = function() {
			this.element.style.display = 'none';
		};

		Modal.prototype.isVisible = function() {
			return this.element.style.display === 'block';
		}

		return Modal;
	});