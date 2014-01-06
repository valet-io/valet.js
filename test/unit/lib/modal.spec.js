define(['lib/modal'], function(Modal) {
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
				this.element = this.modal.createElement();
			});

			it('can be created', function() {
				expect(this.element).to.not.be(undefined);
			});

			it('can be set to an existing element during construction', function() {
				var element = document.createElement('div'),
				modal = new Modal(element);
				expect(modal.element).to.be(element);
			});

			it('has an ID', function() {
				expect(this.element.getAttribute('id')).to.be('valet-io-modal');
			});

			it('should be the first element in the body', function() {
				expect(document.body.firstChild).to.be(this.element);
			});

			it('should emit an event when created', function() {
				sinon.assert.calledWith(this.modal.emit, 'element', this.element);
			});

		});
	});
});