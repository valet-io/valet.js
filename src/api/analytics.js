define(['lib/analytics'], function(Analytics) {
	var analytics = new Analytics();
	analytics.track = function(event) {
		if (!(event instanceof Analytics.Event)) {
			event = new Analytics.Event(event.name, event.data);
		}
		this.queue.push(event);

		return event;
	};
	return analytics;
});