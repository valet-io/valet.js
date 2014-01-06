define(['src/lib/http'], function(Http) {
	'use strict';
	describe('AJAX', function() {

		beforeEach(function() {
			this.xhr = sinon.useFakeXMLHttpRequest();
			var requests = this.requests = [];

			this.xhr.onCreate = function(xhr) {
				requests.push(xhr);
			};

			this.request = function() {
				return requests[0];
			};
		});

		afterEach(function() {
			this.xhr.restore();
		});

		describe('Construction', function() {

			before(function() {
				this.cb = function() {};
				this.http = new Http({
					p1: 'v1'
				}, this.cb);
			});

			it('is instantiated with properties', function() {
				expect(this.http).to.have.property('p1', 'v1');
			});

			it('can take a callback', function() {
				expect(this.http).to.have.property('callback', this.cb);
			});

			it('can take a callback as the first argument', function() {
				expect(new Http(this.cb)).to.have.property('callback', this.cb);
			});

		});

		describe('Sending', function() {

			beforeEach(function() {
				var data = {p1: 'v1'};
				this.http = new Http({
					data: data
				});
				this.dataString = JSON.stringify(data);
				this.http.send();
			});

			it('sets a JSON type', function() {
				expect(this.request().requestHeaders['Content-Type'])
					.to.match(/^application\/json/);
			});

			it('expects JSON back', function() {
				expect(this.request().requestHeaders.Accept)
					.to.be('application/json');
			});

			it('sends data as a JSON string', function() {
				expect(this.request().requestBody)
					.to.be(this.dataString);
			});

			it('sends a POST request', function() {
				expect(this.request().method)
					.to.be('POST');
			});

			it('sends async requests', function() {
				expect(this.request().async)
					.to.be(true);
			});

		});

		describe('Receiving', function() {

			beforeEach(function() {
				var data = {p1: 'v1'};
				this.http = new Http({
					data: data
				});
				this.dataString = JSON.stringify(data);
				this.http.send();
			});

			describe('Response object', function() {

				beforeEach(function() {
					var r = this.response = {
						status: 200,
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({foo: 'bar'})
					};

					this.request().respond(r.status, r.headers, r.body);
				});

				it('has the raw response body', function() {
					expect(this.http.response.bodyText)
						.to.eql(this.response.body);
				});

				it('has the parsed response body', function() {
					expect(this.http.response.body)
						.to.eql(JSON.parse(this.response.body));
				});

				it('has the response code', function() {
					expect(this.http.response.status)
						.to.be(this.response.status);
				});

			});

		});

		describe('Callback', function() {

			beforeEach(function() {
				this.callback = sinon.spy();
				this.http = new Http(this.callback);
				this.http.send();
			});

			describe('Errors', function() {

				it('triggers errors for 400+ status codes', function() {
					this.request().respond(400);
					expect(this.callback.calledWith(sinon.match.instanceOf(Error), null)).to.be(true);
				});

				it('provides a generic error message', function() {
					this.request().respond(400);
					expect(this.callback.calledWith(sinon.match.has('message', 'Request failed.'))).to.be(true);
				});

				it('uses the response body to construct an error message if available', function() {
					this.request().respond(400, {'Content-Type': 'application/json'}, '{"error": {"message": "em"}}');
					expect(this.callback.calledWith(sinon.match.has('message', 'em'))).to.be(true);
				});

				it('embeds the response in the error', function() {
					this.request().respond(400);
					expect(this.callback.calledWith(sinon.match.has('response', this.http.response))).to.be(true);
				});

			});

			describe('Success', function() {

				it('calls the callback with the response', function() {
					this.request().respond(200, {'Content-Type': 'application/json'}, '{"foo": "bar"}');
					expect(this.callback.calledWith(null, sinon.match(this.http.response))).to.be(true);
				});

			});

		});

	});
});