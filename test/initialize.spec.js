/* global Valet */

describe('ValetIO', function() {
	'use strict';


	it('should not expose its private methods', function() {
		expect(window.Valet).to.not.have.property('elements');
	});

	it('should expose a public API', function() {
		expect(Valet).to.be.an('object');
	});
});