define(['src/lib/modal'], function(Modal) {
	'use strict';

	describe('Modal', function() {

		beforeEach(function() {
			this.modal = new Modal();
			sinon.spy(this.modal, 'emit');
		});

		afterEach(function() {
			this.modal.emit.restore();
		});

		it('is an event emitter', function() {
			expect(this.modal).to.have.property('emit');
		});

		describe('Modal Element', function() {

			beforeEach(function() {
				this.modal.element = this.element = this.modal.createElement();
			});

			describe('Creating', function() {

				it('can be created', function() {
					expect(this.element).to.not.be(undefined);
				});

				it('can be set to an existing element during construction', function() {
					var element = document.createElement('div'),
					modal = new Modal(element);
					expect(modal.element).to.be(element);
				});

				it('has an ID', function() {
					expect(this.element.getAttribute('id')).to.be('valet-io-modal-container');
				});

				it('is hidden', function() {
					expect(this.element.style.display).to.be('none');
				});

				it('should be the first element in the body', function() {
					expect(document.body.firstChild).to.be(this.element);
				});

				it('should emit an event when created', function() {
					sinon.assert.calledWith(this.modal.emit, 'element', this.element);
				});

			});

			describe('Loading Content', function() {

				beforeEach(function(done) {
					this.modal.load(done);
				});

				it('loads the modal template into the container', function() {
					expect(this.modal.element.innerHTML[0]).to.be('<');
				});

				it('emits a loading event', function() {
					sinon.assert.calledWith(this.modal.emit, 'loading');
				});

			});

		});

	});
});