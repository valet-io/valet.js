define([
	'src/lib/ui-element',
	'src/lib/dom-listener',
	'src/ui-controllers/loading',
	'src/shims/function/bind'],
	function(UIElement, DOMListener, LoadingOverlay) {
		
		'use strict';

		function Modal(options) {
			this.options = options;
		}

		Modal.prototype = UIElement.create('div', 'valet-io-modal-container');

		Modal.prototype.templateName = 'modal';

		return Modal;
	});