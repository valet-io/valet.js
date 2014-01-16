define(
	['src/lib/ui-element',
	'src/ui-controllers/loading',
	'src/shims/function/bind'],
	function(UIElement, LoadingOverlay) {
		
		'use strict';

		function Modal(options) {
			UIElement.call(this, 'div', 'valet-io-modal-container');

			this.options = options;
			this.on('ready', function() {
				this.ready = true;
			});
		}

		Modal.prototype = Object.create(UIElement.prototype);

		Modal.prototype.templateName = 'modal';

		// Modal is loaded asynchronously, so we override `show`
		Modal.prototype.show = function() {
			var show = function() {
				UIElement.prototype.show.call(this);
			}.bind(this);
			if (this.ready) {
				show();
			} else {
				this.loading = new LoadingOverlay();
				this.loading
					.insertBefore(this.element)
					.load()
					.on('ready', this.loading.show);

				this.on('ready', function() {
					this.loading.hide();
					show();
				});
			}
		};

		return Modal;
	});