define(['src/lib/template', 'src/shims/function/bind'], function(template) {
	'use strict';
	describe('Template', function() {

		before(function() {
			this.server = sinon.fakeServer.create();
		});

		after(function() {
			this.server.restore();
		});

		beforeEach(function() {
			this.server.respondWith('GET', '/base/templates/markup/foo.hbs',
				[200, {}, '{{property}}']);
			this.server.respondWith('GET', '/base/templates/styles/foo.css',
				[200, {}, 'css']);
			this.server.autoRespond = true;
		});

		describe('Success', function() {

			beforeEach(function(done) {
				this.compiled = {
					markup: 'templateVal',
					styles: '<style>css</style>'
				};
				this.callback = sinon.spy(function(err, template) {
					this.template = template;
					this.err = err;
					done();
				}.bind(this));
				template('foo', {property: 'templateVal'}, this.callback);
			});

			it('compiles the handlebars template', function() {
				expect(this.template).to.contain(this.compiled.markup);
			});

			it('wraps the CSS in style tags', function() {
				expect(this.template).to.contain(this.compiled.styles);
			});

			it('concatenates the HTML and CSS', function() {
				expect(this.template).to.be(this.compiled.styles + this.compiled.markup);
			});

		});

		describe('Failure', function() {

			beforeEach(function(done) {
				this.callback = sinon.spy(function() {
					done();
				});
				template('bad', null, this.callback);
			});

			it('calls the callback with the error', function() {
				sinon.assert.calledWith(this.callback, sinon.match.instanceOf(Error));
			});

		});

	});
});