define(['test/util', 'require'], function(TestUtil, require) {
	'use strict';

	describe('Tracking', function() {

		beforeEach(function(done) {
			this.testUtil = new TestUtil();

			require(['src/lib/analytics'], function(Analytics) {
				this.Analytics = sinon.spy(Analytics);
				done();
			}.bind(this));
		});

		beforeEach(function(done) {
			
			this.testUtil.stub('src/lib/analytics', this.Analytics);

			this.testUtil.load('src/api/analytics', function(analyticsApi) {
				this.api = analyticsApi;
				this.analytics = this.Analytics.firstCall.thisValue;
				done();
			}.bind(this));
		});

		afterEach(function() {
			this.testUtil.reset();
		});

		beforeEach(function() {
			this.event = new this.Analytics.Event('click');
			this.analytics.queue.empty();
		});

		it('accepts event objects', function() {
			expect(this.api.track(this.event)).to.be(this.event);
		});

		it('casts plain objects into events', function() {
			expect(this.api.track({name: this.event.name, data: this.event.data}))
				.to.be.an(this.Analytics.Event);
		});

		it('pushes events into the queue', function() {
			this.api.track(this.event);
			expect(this.analytics.queue._queue[0])
				.to.eql(this.event);
		});

	});

});