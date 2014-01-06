define(['src/lib/dom-events', 'src/lib/event-emitter'], function(DOMEvents, EventEmitter) {
	'use strict';

	describe('DOM Events', function() {

		beforeEach(function() {
			this.domEvents = new DOMEvents();
		});

		it('is an event emitter', function() {
			expect(this.domEvents).to.be.an(EventEmitter);
		});

		describe('Handling click events', function() {
			beforeEach(function() {
				this.sandbox = sinon.sandbox.create();
			});

			afterEach(function() {
				this.sandbox.restore();
			});

			it('handles click events', function(done) {
				// Trigger a click event
				// http://stackoverflow.com/questions/15739263/phantomjs-click-an-element
				var event = document.createEvent('MouseEvent');
				event.initMouseEvent(
					'click',
					true, true,
					window, null,
					0, 0, 0, 0,
					false, false, false, false,
					0, null
				);

				this.sandbox.stub(DOMEvents.prototype, 'handleEvent', function() {
					done();
				});

				this.domEvents.attachListeners();
				document.dispatchEvent(event);

			});

			it('forwards all click events', function() {
				var event = {type: 'click'};
				var spy = sinon.spy();
				this.domEvents.on('click', spy);
				this.domEvents.handleEvent(event);
				expect(spy.calledWithExactly(event)).to.be(true);
			});
		});

	});

});