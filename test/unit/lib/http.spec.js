define(['lib/http'], function(Http) {
	'use strict';
	describe('AJAX', function() {

		beforeEach(function() {
			this.xhr = sinon.useFakeXMLHttpRequest();
			var requests = this.requests = [];

			this.xhr.onCreate = function(xhr) {
				requests.push(xhr);
			};
		});

		afterEach(function() {
			this.xhr.restore();
		});

		describe('Construction', function() {

			it('is instantiated with properties');
			it('can take a callback');

		});

		describe('Sending', function() {

			it('sets proper JSON headers');
			it('sends data as a JSON');
			it('expects JSON back');

		});

		describe('Receiving', function() {

			it('parses the response when complete');
			it('finds JSON on the client');

			describe('Response object', function() {

				it('has the response body');
				it('has the response code');
				it('has the response text');

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