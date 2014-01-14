define(['src/lib/ui-element', 'spin', 'src/shims/function/bind'], function(UIElement, EventEmitter, Spinner) {
		'use strict';

		function LoadingOverlay(target) {
			this.target = target;

			this.on('load', function() {
				this.attachListeners();
				this.attachSpinner();
			});
		}

		LoadingOverlay.prototype = UIElement.create('div', 'valet-io-loading-overlay');

		LoadingOverlay.prototype.templateName = 'loading';

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