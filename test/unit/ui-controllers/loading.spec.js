define(['src/ui-controllers/loading'], function(LoadingOverlay) {
	'use strict';

	describe('Loading Overlay', function() {

		beforeEach(function() {
			this.overlay = new LoadingOverlay().prepend(document.body);
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
				expect(document.getElementById('valet-io-loading-spinner').firstChild.getAttribute('class')).to.be('spinner');
			});

		});

	});

});