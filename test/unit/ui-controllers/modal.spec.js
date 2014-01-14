define(['src/ui-controllers/modal', 'src/shims/function/bind'], function(Modal) {
	'use strict';

	describe('Modal', function() {

		beforeEach(function() {
			this.modal = new Modal({
				url: 'http://localhost:9800/frame.html',
				page: location.href
			});
			sinon.spy(this.modal, 'emit');
		});

		afterEach(function() {
			this.modal.emit.restore();
		});

		it('is a UI Element', function() {
			expect(this.modal).to.have.property('append');
		});

		it('is an event emitter', function() {
			expect(this.modal).to.have.property('emit');
		});

		describe('Element', function() {

			beforeEach(function() {
				this.modal.append(document.body);
			});

			xdescribe('Showing the modal before load', function() {

				beforeEach(function(done) {
					this.server = sinon.fakeServer.create();
					this.server.respondWith('GET', '/base/templates/modal/modal.css',
						[200, {}, 'css']);
					this.server.autoRespond = true;
					this.server.autoRespondAfter = 100;
					this.callback = sinon.spy();
					this.modal.load(this.callback);
					this.modal.show(done);
				});

				afterEach(function() {
					this.server.restore()
				});

				it('shows a loading overlay', function() {
					expect(this.modal.loading.isVisible()).to.be(true);
				});

				it('can hide the overlay while load continues');

				it('destroys the overlay when load completes');

			});

		});

	});
});