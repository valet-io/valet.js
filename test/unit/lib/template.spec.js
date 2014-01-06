define(['src/lib/template', 'src/shims/function/bind'], function(template) {

	describe('Template', function() {

		before(function() {
			this.xhr = sinon.useFakeXMLHttpRequest();
		});

		after(function() {
			this.xhr.restore();
		});

		before(function(done) {
			this.callback = sinon.spy();
			template('foo', this.callback);
			this.requests = [];
			this.xhr.onCreate = function(xhr) {
				if (this.requests.push(xhr) == 2) {done();}
			}.bind(this);
		});

		describe('Request', function() {

			it('requests the HTML markup', function() {
				expect(this.requests[0].url).to.match(/\/templates\/html\/foo.html$/)
			});

			it('requests the CSS styles', function() {
				expect(this.requests[1].url).to.match(/\/templates\/styles\/foo.css$/);
			});

		});

		describe('Generated Template', function() {

			before(function() {
				this.requests[0].respond(200, {}, 'html');
				this.requests[1].respond(200, {}, 'css');
			});

			it('concatenates the HTML and CSS', function() {
				sinon.assert.calledWith(this.callback, null, "<style>css</style>html");
			});
		})

	});
});