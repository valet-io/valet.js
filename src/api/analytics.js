define(function() {
	'use strict';

	function Analytics() {
		this._eventQueue = [];
	}

	Analytics.prototype = {
		track: function(event, data) {
			if (typeof event !== 'string') {
				throw new Error('Event tracking requires an event name');
			}
			this._eventQueue.push({event: event, data: data});
		},
		send: function() {
			
		}
	};

	return Analytics;

});