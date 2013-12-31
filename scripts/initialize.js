(function() {
	'use strict';

	var ValetIO = {
		_scriptElement: document.getElementById('valet-initialize'),
		_attachListeners: function() {
			var d = document;
			if (d.addEventListener) {
				return d.addEventListener('click', this._events.click, false);
			} else if (d.attachEvent) {
				return d.attachEvent('onclick', this._events.click);
			}
		},
		_events: {
			click: function(event) {
				return event;
			}
		}
	};

	ValetIO._attachListeners();

}());

/*exported Valet */

var Valet = {
	_events: {},
	on: function(event, handler) {
		'use strict';
		this._events[event] = this._events[event] || [];
		this._events[event].push(handler);
	},
	removeListener: function(event, handler) {
		'use strict';
		if (!(event in this._events)) { return false; }
		this._events[event].splice(this._events.indexOf(handler), 1);
	},
	trigger: function(event) {
		'use strict';
		if (!(event in this._events)) { return false; }
		for (var i = 0; i < this._events[event].length; i += 1) {
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	},
	show: function() {
		'use strict';
		this.trigger('show');
	},
	hide: function() {
		'use strict';
		this.trigger('hide');
	},
};