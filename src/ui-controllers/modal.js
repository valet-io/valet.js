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
		var uiShow = Modal.prototype.show;
		Modal.prototype.show = function() {
			if (this.ready) {
				uiShow.call(this);
			} else {
				this.loading = new LoadingOverlay();
				this.loading
					.insertBefore(this.element)
					.load(null, function() {
						this.show();
					});
			}
		};

		return Modal;
	});