define(function() {
	'use strict';

	function Http(attributes, callback) {
		for (var property in attributes) {
			if (attributes.hasOwnProperty(property)) {
				this[property] = attributes[property];
			}
		}
		this.callback = callback;

		this.client = new XMLHttpRequest();
		this.client.timeout = 5000;
		this.client.responseType = 'json';
		this.client.onreadystatechange = this.callback;
		this.client.ontimeout = this._onTimeout;
	}

	Http.prototype = {
		send: function() {
			this.client.open('POST', this.url).send(JSON.stringify(this.data));
		}
	};


});