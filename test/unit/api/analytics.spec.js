define(['api/analytics', 'lib/http'], function(Analytics, Http) {
	'use strict';

	describe('Analytics', function() {

		beforeEach(function() {
			this.analytics = new Analytics();
		});

		describe('Events', function() {
			beforeEach(function() {
				this.event = new Analytics.Event('click', 'data');
			});

			it('requires a name', function() {
				expect(function() {
					/*jshint nonew: false */
					new Analytics.Event();
				}).to.throwError(/name/);
			});

			it('can have event data', function() {
				expect(this.event).to.have.property('data', 'data');
			});

			it('records a timestamp', function() {
				expect(this.event.timestamp).to.be.a(Date);
			});

		});

		describe('Tracking events', function() {

			beforeEach(function() {
				this.event = new Analytics.Event('click');
			});

			it('accepts event objects', function() {
				expect(this.analytics.track(this.event)).to.be(this.event);
			});

			it('casts plain objects into events', function() {
				expect(this.analytics.track({name: this.event.name, data: this.event.data})).to.be.an(Analytics.Event);
			});

			it('pushes events into the queue to be sent to the server', function() {
				this.analytics.track(this.event);
				expect(this.analytics._eventQueue[0])
					.to.be(this.event);
			});

		});

		describe('Sending queued events', function() {

			beforeEach(function() {
				this.analytics._eventQueue.push(new Analytics.Event('click'));
			});

			beforeEach(function() {
				this.xhr = sinon.useFakeXMLHttpRequest();
				var requests = this.requests = [];
				this.xhr.onCreate = function (xhr) {
					requests.push(xhr);
				};
				this.request = function() {
					return requests[0];
				};
			});

			it('is a no-op if the queue is empty', function() {
				this.analytics._eventQueue = [];
				expect(this.analytics.send()).to.be(undefined);
			});

			it('is a no-op is there is an existing pending request', function() {
				this.analytics._eventQueue = [{}];
				this.analytics.request = {};
				expect(this.analytics.send()).to.be(undefined);
			});

			it('creates an HTTP request to send the queue', function() {
				this.analytics.send();
				expect(this.analytics.request).to.be.a(Http);
			});

			it('adds the event queue to the request data', function() {
				this.analytics.send();
				expect(this.analytics.request.data).to.have.property('events', this.analytics._eventQueue);
			});

			it('returns the number of sent items', function() {
				expect(this.analytics.send()).to.be(1);
			});

			describe('Handling the response', function() {

				beforeEach(function() {
					this.handler = sinon.spy(this.analytics, '_responseHandler');
					this.callback = sinon.spy();
					this.analytics.send(this.callback);
				});

				afterEach(function() {
					this.xhr.restore();
				});

				describe('Always', function() {

					beforeEach(function() {
						this.request().respond(200);
					});

					it('deletes the request', function() {
						expect(this.analytics.request).to.be(null);
					});

					it('calls the callback', function() {
						expect(this.callback.calledOnce).to.be(true);
					});

					it('calls the callback with node-style arguments', function() {
						expect(this.callback.calledWith(null, sinon.match.instanceOf(Error)));
					});

				});

				describe('Success', function() {

					beforeEach(function() {
						this.request().respond(200);
					});

					it('clears the queue', function() {
						expect(this.analytics._eventQueue).to.have.length(0);
					});

				});

				describe('Failure', function() {
					beforeEach(function() {
						this.request().respond(400);
					});

					it('preserves the queue for a retry', function() {
						expect(this.analytics._eventQueue).to.have.length(1);
					});

				});

			});

		});

		describe('Processing event queue', function() {

			it('triggers a send cycle on page load');
			it('triggers cycles when the previous cycle completes');


		});

	});

});