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
			template('foo', {property: 'templateVal'}, this.callback);
			this.requests = [];
			this.xhr.onCreate = function(xhr) {
				if (this.requests.push(xhr) == 2) {done();}
			}.bind(this);
		});

		describe('Request', function() {

			it('requests the HTML markup', function() {
				expect(this.requests[0].url).to.match(/\/templates\/markup\/foo.hbs$/)
			});

			it('requests the CSS styles', function() {
				expect(this.requests[1].url).to.match(/\/templates\/styles\/foo.css$/);
			});

		});

		describe('Generated Template', function() {

			before(function(done) {
				this.requests[0].respond(200, {}, '{{property}}');
				this.requests[1].respond(200, {}, 'css');
				// Dirty hack to let templates compile without using the callback
				setTimeout(done, 0);
			});

			it('concatenates the HTML and CSS', function() {
				sinon.assert.calledWith(this.callback, null, "<style>css</style>templateVal");
			});
		})

	});
});