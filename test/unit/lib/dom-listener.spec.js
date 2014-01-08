define(['src/lib/dom-listener'], function(DOMListener) {
	'use strict';

	describe('DOM Listener', function() {

		beforeEach(function() {
			this.listener = new DOMListener(document, 'load', 'click', 'custom');
			sinon.spy(this.listener, 'emit');
		});

		it('is an event emitter', function() {
			expect(this.listener).to.have.property('emit');
		});

		it('holds the list of events', function() {
			expect(this.listener.events).to.eql(['load', 'click', 'custom']);
		});

		it('can accept an array of events', function() {
			var listener = new DOMListener(document, ['e1', 'e2']);
			expect(listener.events).to.eql(['e1', 'e2']);
		});

		it('provides DOM handlers functions', function() {
			expect(this.listener.handle('name')).to.be.a('function');
		});

		it('re-emits events from the handler', function() {
			var event = {};
			this.listener.handle('name')(event);
			sinon.assert.calledWith(this.listener.emit, 'name', event);
		});

		it('emits triggered events', function() {
			var event = document.createEvent('Event');
			event.initEvent('custom', true, true);
			document.dispatchEvent(event);
			sinon.assert.calledWith(this.listener.emit, 'custom', event);
		});

	});

});