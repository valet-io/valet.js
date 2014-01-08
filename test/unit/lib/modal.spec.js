define(['src/lib/modal', 'src/shims/function/bind'], function(Modal) {
	'use strict';

	describe('Modal', function() {

		beforeEach(function() {
			this.modal = new Modal(null, {
				url: 'http://localhost:9800/frame.html',
				page: location.href
			});
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

			describe('Loading Content (Frame)', function() {

				beforeEach(function(done) {
					this.modal.load(done);
				});

				it('loads the modal template into the container', function() {
					expect(this.modal.element.innerHTML).to.match(/^<style>/);
				});

				it('emits a loading event', function() {
					sinon.assert.calledWith(this.modal.emit, 'loading');
				});

				it('attaches the frame event emitter to the modal', function() {
					expect(this.modal.frame).to.have.property('emit');
				});

				it('repeats and prefixes frame messages', function() {
					this.modal.frame.emit('message', {data: 'event'});
					sinon.assert.calledWith(this.modal.emit, 'frame::event');
				});

				it('emits a ready event when the frame acknowledges load', function() {
					this.modal.emit('frame::load');
					sinon.assert.calledWith(this.modal.emit, 'ready');
				});

			});

		});

	});
});