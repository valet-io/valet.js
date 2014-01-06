define(['src/shims/function/bind'], function(bind) {
	'use strict';

	function Http(attributes, callback) {
		if (attributes && typeof attributes !== 'function') {
			for (var property in attributes) {
				if (attributes.hasOwnProperty(property)) {
					this[property] = attributes[property];
				}
			}
		} else if (typeof attributes === 'function') {
			callback = attributes;
		}

		this.callback = callback;

		this.client = new XMLHttpRequest();
		this.client.onreadystatechange = this._onReadyStateChange.bind(this);
	}

	Http.prototype = {
		send: function() {
			var body = JSON.stringify(this.data);
			this.client.open('POST', this.url);
			this.client.timeout = this.timeout || 5000;
			this.client.setRequestHeader('Content-Type','application/json;charset=UTF-8');
			this.client.setRequestHeader('Accept', 'application/json');
			this.client.send(body);
		},
		_parseResponse: function() {
			return {
				bodyText: this.client.responseText,
				body: this.client.responseText ? JSON.parse(this.client.responseText) : null,
				status: this.client.status
			};
		},
		_onReadyStateChange: function() {
			if (this.client.readyState === 4) {
				this.response = this._parseResponse();

				if (this.callback) {
					if (this.response.status >= 400) {
						var err = new Error();
						if (this.response.body && this.response.body.error && this.response.body.error.message) {
							err.message = this.response.body.error.message;
						} else {
							err.message = 'Request failed.';
						}
						err.response = this.response;
						return this.callback(err, null);
					} else {
						return this.callback(null, this.response);
					}
				}
			}
		}
	};

	return Http;

});