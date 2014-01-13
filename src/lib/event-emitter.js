define(function() {
	'use strict';

	// A lightweight EventEmitter implementation

	function EventEmitter() {
		this._events = {};
	}

	EventEmitter.prototype = {
		on: function(event, fn) {
			this._events[event] = this._events[event] || [];
			this._events[event].push(fn);
			return this;
		},
		removeListener: function(event, fn) {
			if (!(event in this._events)) { return false; }
			this._events[event].splice(this._events[event].indexOf(fn), 1);
		},
		emit: function(event) {
			if (!(event in this._events)) { return false; }
			var args = Array.prototype.slice.call(arguments, 1);
			for (var i = 0; i < this._events[event].length; i += 1) {
				this._events[event][i].apply(this, args);
			}
			if (this._proxies) {
				for (var j = 0; j < this._proxies.length; j += 1) {
					var proxy = this._proxies[j];
					proxy.emit.apply(proxy, [event].concat(args));
				}
			}
			return true;
		},
		proxy: function(target) {
			this._proxies = this._proxies || [];
			this._proxies.push(target);
			return this;
		}
	};

	return EventEmitter;
});