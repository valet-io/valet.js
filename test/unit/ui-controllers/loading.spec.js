define(['src/ui-controllers/loading'], function(LoadingOverlay) {
	'use strict';

	describe('Loading Overlay', function() {

		beforeEach(function() {
			this.overlay = new LoadingOverlay().prepend(document.body);
		});

		afterEach(function() {
			// this.overlay.remove();
		});

		it('is an event emitter', function() {
			expect(this.overlay).to.have.property('emit');
		});

		it('is a UIElement', function() {
			expect(this.overlay).to.have.property('append');
		});

		describe('Loading', function() {

			beforeEach(function(done) {
				this.overlay.load(null, done);
			});

			it('inserts the spinner', function() {
				var container = document.getElementById('valet-io-loading-spinner');
				expect(container.firstChild.getAttribute('class')).to.be('spinner');
			});

		});

	});

});