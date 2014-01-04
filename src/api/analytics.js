define(['lib/http', 'shims/function/bind'], function(Http) {
	'use strict';

	function Analytics() {
		this._eventQueue = [];
	}

	Analytics.prototype = {
		track: function(event) {
			if (!(event instanceof Analytics.Event)) {
				event = new Analytics.Event(event.name, event.data);
			}
			this._eventQueue.push(event);
			return event;
		},
		send: function(callback) {
			if (!this._eventQueue.length || this.request) {return;}
			this.request = new Http({data: {events: this._eventQueue}}, this._responseHandler(callback));
			this.request.send();
			return this._eventQueue.length;
		},
		_responseHandler: function(callback) {

			return function(err, response) {
				this.request = null;
				if (!err) {
					this._eventQueue = [];
				}
				if (callback) {
					return callback(err, response);
				}
			}.bind(this);
		}
	};

	Analytics.Event = function(name, data) {
		if (typeof name !== 'string') {
			throw new Error('Event must define a name.');
		}
		this.name = name;
		this.data = data;
		this.timestamp = new Date();
	};

	return Analytics;

});