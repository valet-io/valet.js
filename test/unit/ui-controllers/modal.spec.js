define(['src/ui-controllers/modal', 'src/shims/function/bind'], function(Modal) {
	'use strict';

	describe('Modal', function() {

		beforeEach(function() {
			this.modal = new Modal({
				url: 'http://localhost:9800/frame.html',
				page: location.href
			}).append(document.body);
			sinon.spy(this.modal, 'emit');
		});

		it('is a UI Element', function() {
			expect(this.modal).to.have.property('append');
		});

		it('is an event emitter', function() {
			expect(this.modal).to.have.property('emit');
		});

		describe('Showing', function() {

			describe('Before Load', function() {

				beforeEach(function(done) {
					this.modal.show();
					this.loading = this.modal.loading;
					this.loading.on('ready', done);
				});

				it('does not immediately show the modal', function() {
					expect(this.modal.isVisible()).to.be(false);
				});

				it('instantiates the loading overlay', function() {
					expect(this.modal.loading).to.not.be(undefined);
				});

				it('shows the overlay when it is ready', function() {
					expect(this.loading.isVisible()).to.be(true);
				});

				it('hides the overlay when load completes', function() {
					this.modal.emit('ready');
					expect(this.loading.isVisible()).to.be(false)
				});

				it('shows the overlay when load completes', function() {
					this.modal.emit('ready');
					expect(this.modal.isVisible()).to.be(true);
				});

			});

			describe('After Load', function() {

				beforeEach(function() {
					this.modal.ready = true;
					this.modal.show();
				});

				it('shows the modal immediately', function() {
					expect(this.modal.isVisible()).to.be(true);
				});

			});

		});

	});
});