define(
	['src/lib/template',
	'src/lib/dom-listener',
	'src/lib/event-emitter',
	'spin',
	'src/shims/function/bind'],
	function(template, DOMListener, EventEmitter, Spinner) {
		'use strict';

		function LoadingOverlay(target) {
			this.target = target;
		}

		LoadingOverlay.prototype = new EventEmitter();

		LoadingOverlay.prototype.createElement = function() {
			var element = document.createElement('div');
			element.setAttribute('id', 'valet-io-loading-overlay');
			element.style.display = 'none';
			this.target.insertBefore(element, this.target.firstChild);
			return element;
		};

		LoadingOverlay.prototype.initialize = function(callback) {
			this.element = this.createElement();
			template('loading', null, function(err, template) {
				if (!err) {
					this.element.innerHTML = template;
					this.attachListeners();
					this.attachSpinner();
				}
				if (callback) {
					callback.call(this, err);
				}
			}.bind(this));

			return this;
		};

		LoadingOverlay.prototype.destroy = function() {
			this.target.removeChild(this.element);
		};

		LoadingOverlay.prototype.show = function() {
			this.element.style.display = 'block';
			this.emit('show');
		};

		LoadingOverlay.prototype.hide = function() {
			this.element.style.display = 'none';
			this.emit('hide');
		};

		LoadingOverlay.prototype.isVisible = function() {
			return this.element.style.display === 'block';
		};

		LoadingOverlay.prototype.attachListeners = function() {
			var element = document.getElementById('valet-io-loading-close');
			new DOMListener(element, 'click').on('click', function() {
				this.hide();
			}.bind(this));
		};

		LoadingOverlay.prototype.attachSpinner = function() {
			var element = document.getElementById('valet-io-loading-spinner');
			var spinner = new Spinner({
				color: '#fff',
				length: 30,
				lines: 15,
				radius: 50,
				width: 12
			}).spin();
			element.appendChild(spinner.el);
		};

		return LoadingOverlay;
	}
);