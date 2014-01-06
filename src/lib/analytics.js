define(['src/lib/http', 'src/shims/function/bind'], function(Http) {
	'use strict';

	function Analytics() {}

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

	Analytics.EventQueue = function(queue) {
		this._queue = queue || [];
	};

	Analytics.EventQueue.prototype = {
		interval: 1000,
		poll: function() {
			setTimeout(function() {
				if (this.length()) {
					this.send(function() {
						this.poll();
					});
				} else {
					setTimeout(this.poll.bind(this), this.interval);
				}
			}.bind(this), this.interval);
		},
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
			this.request = new Http({data: {events: this._queue}}, this._onReceived(callback));
			this.empty();
			this.request.send();
			return this._pending.length;
		},
		_onReceived: function(callback) {

			return function(err, response) {
				this.request = null;
				if (!err) {
					this._pending = [];
					this.empty();
				} else {
					this._queue = this._pending.concat(this._queue);
				}
				if (callback) {
					callback.call(this, err, response);
				}
			}.bind(this);
		}
	};

	Analytics.prototype = {
		initialize: function() {
			this.queue.poll();
		},
		queue: new Analytics.EventQueue()
	};

	return Analytics;

});