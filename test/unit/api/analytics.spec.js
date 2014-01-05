define(['api/analytics', 'lib/analytics'], function(api, Analytics) {

	describe('Tracking', function() {

		beforeEach(function() {
			this.event = new Analytics.Event('click');
			api.queue.empty();
		});

		it('accepts event objects', function() {
			expect(api.track(this.event)).to.be(this.event);
		});

		it('casts plain objects into events', function() {
			expect(api.track({name: this.event.name, data: this.event.data})).to.be.an(Analytics.Event);
		});

		it('pushes events into the queue', function() {
			api.track(this.event);
			expect(api.queue._queue[0])
				.to.eql(this.event);
		});

	});
});