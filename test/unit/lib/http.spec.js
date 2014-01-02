define(['lib/http'], function(Http) {
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

		describe('Errors', function() {

			it('triggers errors for 400+ status codes');
			it('embeds the response body in the error');
			it('triggers errors for timeouts');

		});

		describe('Callback', function() {

			it('makes the node-style callback optional');
			it('calls with the response body as arg 0');
			it('calls with an error as arg 1');
		});

	});
});