define(['api/analytics'], function(Analytics) {
	'use strict';

	describe('Analytics', function() {

		beforeEach(function() {
			this.analytics = new Analytics();
		});

		describe('Tracking events', function() {

			it('requires an event name', function() {
				var _this = this;
				expect(function() {
					_this.analytics.track();
				}).to.throwError(/requires an event/);
			});

			it('pushes events into the queue to be sent to the server', function() {
				this.analytics.track('event', 'data');
				expect(this.analytics._eventQueue[0])
					.to.have.property('event', 'event');
			});

		});

		describe('Processing event queue', function() {

		});

	});

});