define(['src/lib/dom-element'], function(DOMElement) {
	'use strict';

	describe('Creating', function() {
		it('is a div by default')
		it('can be a custom tag');
		it('requires an ID');
		it('can set other attributes');
	});

	describe('Wrapping an existing element', function() {
		it('can wrap an existing DOM node');
	});

	describe('Inserting', function() {
		it('can be appended to a target');
		it('can be prepended to a target');
	});

	describe('Visibility', function() {

		describe('#show', function() {
			it('emits a show event');
			it('sets the display to block');
			it('returns the Element');
		});

		describe('#hide', function() {
			it('emits a hide event');
			it('sets the display to none');
			it('returns the Element');
		});

		describe('#isVisible', function() {
			it('evaluates whether display is none');
		});

		describe('#toggle', function() {
			it('uses #isVisible to determine current state')
			it('emits the event of the new state');
			it('calls the appropriate state method');
			it('returns the Element');
		});
		
	});


});