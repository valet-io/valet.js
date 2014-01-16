define(['src/lib/analytics'], function(Analytics) {
	'use strict';
	var analytics = new Analytics();
	return {
		track: function(event) {
			if (!(event instanceof Analytics.Event)) {
				event = new Analytics.Event(event.name, event.data);
			}
			analytics.queue.push(event);

			return event;
		}
	};
});