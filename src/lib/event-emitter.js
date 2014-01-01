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
		},
		removeListener: function(event, fn) {
			if (!(event in this._events)) { return false; }
			this._events[event].splice(this._events[event].indexOf(fn), 1);
		},
		emit: function(event) {
			if (!(event in this._events)) { return false; }
			for (var i = 0; i < this._events[event].length; i += 1) {
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
			return true;
		}
	};

	return EventEmitter;
});