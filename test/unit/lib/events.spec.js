define(['lib/dom-events', 'lib/event-emitter'], function(DOMEvents, EventEmitter) {
	describe('DOM Events', function() {

		beforeEach(function() {
			this.domEvents = new DOMEvents();
		});

		it('is an event emitter', function() {
			expect(this.domEvents).to.be.an(EventEmitter);
		});

		it('forwards click events', function() {
			var event = {type: 'click'}
			var spy = sinon.spy()
			this.domEvents.on('click', spy);
			this.domEvents.handleEvent(event);
			expect(spy.calledWithExactly(event)).to.be(true);
		});

	});

});