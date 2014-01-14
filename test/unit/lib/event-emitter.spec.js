define(['src/lib/event-emitter'], function(EventEmitter) {
	'use strict';
	describe('EventEmitter', function() {

		beforeEach(function() {
			this.emitter = new EventEmitter();
		});

		it('begins with no events', function() {
			for (var event in this.emitter._events) {
				expect(event).to.be(undefined);
			}
		});

		it('registers named events', function() {
			this.emitter.on('event', function() {});
			expect(this.emitter._events.event[0]).to.be.a('function');
		});

		it('can remove listeners', function() {
			var handler = function() {};
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

		describe('Proxying events', function() {

			beforeEach(function() {
				this.emitter2 = new EventEmitter().proxy(this.emitter);
				this.listener = sinon.spy();
				sinon.spy(this.emitter, 'emit');
				this.emitter2.on('pEvent', this.listener);
				this.emitter2.emit('pEvent', 'arg1', 'arg2');
			});

			it('registers the proxy target on the source emitter', function() {
				expect(this.emitter2._proxies).to.contain(this.emitter);
			});

			it('does not change source listener behavior', function() {
				sinon.assert.calledWith(this.listener, 'arg1', 'arg2');
			});

			it('emits events from the source on the target', function() {
				sinon.assert.calledWith(this.emitter.emit, 'pEvent', 'arg1', 'arg2');
			});

		});

	});
});