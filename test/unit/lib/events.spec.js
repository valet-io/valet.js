define(['lib/event-emitter'], function(EventEmitter) {
	'use strict';
	describe('EventEmitter', function() {

		beforeEach(function() {
			this.emitter = new EventEmitter();
		});

		it('begins with no events', function() {
			for(var event in this.emitter._events) {
				expect(event).to.be(undefined);
			}
		});

		it('registers named events', function() {
			this.emitter.on('event', function() {});
			expect(this.emitter._events.event[0]).to.be.a('function');
		});

		it('can remove listeners', function() {
			var handler = function() {}
			this.emitter.on('event', handler);
			this.emitter.removeListener('event', handler);
			expect(this.emitter._events.event).to.have.length(0);
		});

		describe('Emitting events', function() {

			it('calls all listeners when emitting an event', function() {
				var listener1 = sinon.spy(),
				    listener2 = sinon.spy();

			    this.emitter.on('event', listener1);
			    this.emitter.on('event', listener2);

			    this.emitter.emit('event');

			    expect(listener1.called).to.be(true);
			    expect(listener2.called).to.be(true);
			});

			it('returns true if there are listeners', function() {
				this.emitter.on('event', function() {});
				expect(this.emitter.emit('event')).to.be(true);
			});

			it('returns false if there are no listeners', function() {
				expect(this.emitter.emit('event')).to.be(false);
			});

		});

	});
});