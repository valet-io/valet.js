define(['lib/http', 'shims/function/bind'], function(Http) {
	'use strict';

	function Analytics() {}

	Analytics.EventQueue = function(queue) {
		this._queue = queue || [];
	};

	Analytics.Event = function(name, data) {
		if (typeof name !== 'string') {
			throw new Error('Event must define a name.');
		}
		this.name = name;
		this.data = data;
	};

	Analytics.Event.prototype = {
		timestamp: new Date()
	};

	Analytics.EventQueue.prototype = {
		length: function() {
			return this._queue.length;
		},
		push: function() {
			return this._queue.push.apply(this._queue, arguments);
		},
		empty: function() {
			this._queue = [];
			return this;
		},
		send: function(callback) {
			if (!this.length() || this.request) {return;}
			this._pending = this._queue;
			this.empty();
			this.request = new Http({data: {events: this._queue}}, this._onReceived(callback));
			this.request.send();
			return this._pending.length;
		},
		_onReceived: function(callback) {

			return function(err, response) {
				this.request = null;
				if (!err) {
					this.empty();
				} else {
					this._queue = this._pending.concat(this._queue);
				}
				if (callback) {
					return callback(err, response);
				}
			}.bind(this);
		}
	};

	Analytics.prototype = {
		queue: new Analytics.EventQueue(),
		track: function(event) {
			if (!(event instanceof Analytics.Event)) {
				event = new Analytics.Event(event.name, event.data);
			}
			this.queue.push(event);
			return event;
		}
	};

	return Analytics;

});