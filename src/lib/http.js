define(function() {
	'use strict';

	// Shim Fn.proto.bind
	Function.prototype.bind = Function.prototype.bind || function(context) {
		var self = this;

		return function() {
			return self.apply(context, arguments);
		};
	};


	function Http(attributes, callback) {
		for (var property in attributes) {
			if (attributes.hasOwnProperty(property)) {
				this[property] = attributes[property];
			}
		}
		this.callback = callback;

		this.client = new XMLHttpRequest();
		this.client.timeout = 5000;
		this.client.onreadystatechange = this._onReadyStateChange.bind(this);
		this.client.ontimeout = this._onTimeout;
	}

	Http.prototype = {
		send: function() {
			var body = JSON.stringify(this.data);
			this.client.open('POST', this.url);
			this.client.setRequestHeader('Content-Type','application/json;charset=UTF-8');
			this.client.setRequestHeader('Accept', 'application/json');
			this.client.send(body);
		},
		_parseResponse: function() {
			return {
				bodyText: this.client.responseText,
				body: JSON.parse(this.client.responseText),
				status: this.client.status
			};
		},
		_onReadyStateChange: function() {
			if (this.client.readyState === 4) {
				this.response = this._parseResponse();
			}
		},
		_onTimeout: function() {}
	};

	return Http;

});