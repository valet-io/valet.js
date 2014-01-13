define(['src/lib/event-emitter',
	'src/lib/template',
	'src/lib/dom-listener',
	'src/lib/loading',
	'src/shims/function/bind'],
	function(EventEmitter, template, DOMListener, LoadingOverlay) {
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
						this.emit('ready');
						this.isReady = true;
						this.frame = new DOMListener(window, 'message');
						this.frame.on('message', function(event) {
							this.emit('frame::' + event.data);
						}.bind(this));
						this.on('frame::load', function() {
							this.emit('load');
						});
					}
					callback(err);
				}.bind(this));
		};

		Modal.prototype.show = function(callback) {
			if (this.isReady) {
				this.element.style.display = 'block';
				if (callback) { callback(); }
			} else {
				this.loading = new LoadingOverlay(document.body);
				this.loading.initialize(function() {
					this.loading.show();
					callback();
				}.bind(this));
			}
		};

		Modal.prototype.hide = function() {
			this.element.style.display = 'none';
		};

		Modal.prototype.isVisible = function() {
			return this.element.style.display === 'block';
		};

		return Modal;
	});