define(['src/lib/loading'], function(LoadingOverlay) {
	'use strict';

	describe('Loading Overlay', function() {

		beforeEach(function() {
			this.overlay = new LoadingOverlay(document.body.appendChild(document.createElement('div')));
		});

		afterEach(function() {
			try { this.overlay.destroy(); } catch(e){}
		});

		it('is an event emitter', function() {
			expect(this.overlay).to.have.property('emit');
		});

		describe('Element', function() {

			beforeEach(function() {
				this.overlay.element = this.element = this.overlay.createElement();
			});

			it('has an ID', function() {
				expect(this.element.getAttribute('id')).to.be('valet-io-loading-overlay');
			});

			it('starts hidden', function() {
				expect(this.element.style.display).to.be('none');
			});

			it('is the first child of the target', function() {
				expect(this.overlay.target.firstChild).to.be(this.element);
			});

			it('can be destroyed', function() {
				this.overlay.destroy();
				expect(this.element.firstChild).to.not.be(this.element);
			});

		});

		describe('Initialization', function() {

			beforeEach(function(done) {
				this.server = sinon.fakeServer.create();
				this.server.xhr.useFilters = true;
				this.server.xhr.addFilter(function(method, url) {
					return !url.match(/\.css/);
				});
				this.server.respondWith('GET', '/base/templates/loading/loading.css',
					[200, {}, 'css']);
				this.server.autoRespond = true;
				this.overlay.initialize(done);
			});

			it('populates the element with the template', function() {
				expect(this.overlay.element.innerHTML).to.match(/^<style>css<\/style><div/);
			});

			it('inserts the spinner', function() {
				expect(document.getElementById('valet-io-loading-spinner').firstChild.getAttribute('class')).to.be('spinner');
			});

		});

	});

});