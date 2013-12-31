/*exported Valet */

var Valet = (function() {
	'use strict';

	var Valet = {
		elements: {
			script: document.getElementById('valet-initialize'),
		},
		attachListeners: function() {
			var d = document;
			if (d.addEventListener) {
				return d.addEventListener('click', this.eventHandlers.click, false);
			} else if (d.attachEvent) {
				return d.attachEvent('onclick', this.eventHandlers.click);
			}
		},
		eventHandlers: {
			click: function(event) {
				return event;
			}
		},
		api: {
			_events: {},
			on: function(event, handler) {
				this._events[event] = this._events[event] || [];
				this._events[event].push(handler);
			},
			removeListener: function(event, handler) {
				if (!(event in this._events)) { return false; }
				this._events[event].splice(this._events.indexOf(handler), 1);
			},
			trigger: function(event) {
				if (!(event in this._events)) { return false; }
				for (var i = 0; i < this._events[event].length; i += 1) {
					this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			},
			show: function() {
				this.trigger('show');
			},
			hide: function() {
				this.trigger('hide');
			}
		}
	};

	Valet.attachListeners();

	return Valet.api;

}());