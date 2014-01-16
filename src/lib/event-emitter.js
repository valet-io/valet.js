define(function() {
	'use strict';

	// A lightweight EventEmitter implementation

	function EventEmitter() {
		this._events = this._events || {};
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
			var handled = false,
			args = Array.prototype.slice.call(arguments, 1);

			if (event in this._events) {
				for (var i = 0; i < this._events[event].length; i += 1) {
					this._events[event][i].apply(this, args);
				}

				handled = true;
			}
				
			if (this._proxies) {
				for (var j = 0; j < this._proxies.length; j += 1) {
					var proxy = this._proxies[j];
					var name = proxy.prefix ? proxy.prefix + ':' + event : event;

					if (proxy.target.emit.apply(proxy.target, [name].concat(args))) {
						handled = true;
					}
				}
			}

			return handled;
		},
		proxy: function(target, prefix) {
			this._proxies = this._proxies || [];
			this._proxies.push({target: target, prefix: prefix});
			return this;
		}
	};

	return EventEmitter;
});