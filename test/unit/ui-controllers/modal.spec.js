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

		describe('Showing the modal before load', function() {

			beforeEach(function() {
				this.server = sinon.fakeServer.create();
				this.server.respondWith('GET', '/base/templates/modal/modal.css',
					[200, {}, 'css']);
				this.server.autoRespond = true;
				this.server.autoRespondAfter = 100;
				this.callback = sinon.spy();
				this.modal.load(this.options, this.callback);
				this.modal.show();
			});

			afterEach(function() {
				this.server.restore()
			});

			it('intiates the loading overlay', function() {
				console.log(this.modal.loading._events);
				expect(this.modal.loading.isVisible()).to.be(true);
			});

			it('can hide the overlay while load continues');

			it('destroys the overlay when load completes');

		});

	});
});