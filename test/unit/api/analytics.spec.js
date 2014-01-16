define(['src/api/analytics', 'src/lib/analytics'], function(analytics, Analytics) {

	describe('Tracking', function() {

		beforeEach(function() {
			this.event = new Analytics.Event('click');
			analytics.queue.empty();
		});

		it('accepts event objects', function() {
			expect(analytics.track(this.event)).to.be(this.event);
		});

		it('casts plain objects into events', function() {
			expect(analytics.track({name: this.event.name, data: this.event.data})).to.be.an(Analytics.Event);
		});

		it('pushes events into the queue', function() {
			analytics.track(this.event);
			expect(analytics.queue._queue[0])
				.to.eql(this.event);
		});

	});
});