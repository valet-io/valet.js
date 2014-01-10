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
					this.server = sinon.fakeServer.create();
					this.server.respondWith('GET', '/base/templates/modal/modal.css',
						[200, {}, 'css']);
					this.server.autoRespond = true;
					this.modal.load(done);
				});

				afterEach(function() {
					this.server.restore();
				});

				it('loads the modal template into the container', function() {
					expect(this.modal.element.innerHTML).to.match(/^<style>css<\/style>/);
				});

				it('emits a ready event', function() {
					sinon.assert.calledWith(this.modal.emit, 'ready');
				});

				it('attaches the frame postMessage emitter to the modal', function() {
					expect(this.modal.frame).to.have.property('emit');
				});

				it('repeats and prefixes frame messages', function() {
					this.modal.frame.emit('message', {data: 'event'});
					sinon.assert.calledWith(this.modal.emit, 'frame::event');
				});

				it('emits a load event when the frame acknowledges load', function() {
					this.modal.emit('frame::load');
					sinon.assert.calledWith(this.modal.emit, 'load');
				});

			});

			describe('Toggling Visibility', function() {

				it('can be shown', function() {
					this.modal.show();
					expect(this.element.style.display).to.be('block');
				});

				it('can be hidden', function() {
					this.modal.show();
					this.modal.hide();
					expect(this.element.style.display).to.be('none');
				});

				it('can check its visibility status', function() {
					this.modal.show();
					expect(this.modal.isVisible()).to.be(true);
				});

			});

			describe('Showing the modal before load', function() {

				beforeEach(function(done) {
					this.server = sinon.fakeServer.create();
					this.server.respondWith('GET', '/base/templates/modal/modal.css',
						[200, {}, 'css']);
					this.server.autoRespond = true;
					this.server.autoRespondAfter(100);
					this.callback = sinon.spy();
					this.modal.load(this.callback);
					this.modal.show();
				});

				afterEach(function() {
					this.server.restore()
				});

				it('shows a loading overlay');

				it('can hide the overlay while load continues');

				it('shows an error if the load fails');

			})

		});

	});
});