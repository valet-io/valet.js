define(['api/analytics', 'lib/http'], function(Analytics, Http) {
	'use strict';

	describe('Analytics', function() {

		beforeEach(function() {
			this.analytics = new Analytics();
		});

		it('has an event queue', function() {
			expect(this.analytics.queue).to.be.an(Analytics.EventQueue);
		});

		describe('Tracking', function() {

			beforeEach(function() {
				this.event = new Analytics.Event('click');
			});

			it('accepts event objects', function() {
				expect(this.analytics.track(this.event)).to.be(this.event);
			});

			it('casts plain objects into events', function() {
				expect(this.analytics.track({name: this.event.name, data: this.event.data})).to.be.an(Analytics.Event);
			});

			it('pushes events into the queue', function() {
				this.analytics.track(this.event);
				expect(this.analytics.queue._queue[0])
					.to.eql(this.event);
			});

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

		describe('Queue', function() {

			beforeEach(function() {
				this.queue = new Analytics.EventQueue();
			});

			it('has a length', function() {
				expect(this.queue.length()).to.be(0);
			});

			it('has an internal queue', function() {
				expect(this.queue._queue).to.be.an(Array);
			});

			it('can instantiate with a queue', function() {
				var queue = ['foo'];
				expect(new Analytics.EventQueue(queue))
					.to.have.property('_queue', queue);
			});

			it('can push items onto the queue', function() {
				this.queue.push('foo', 'bar');
				expect(this.queue._queue).to.contain('foo', 'bar');
			});

			describe('Sending', function() {

				beforeEach(function() {
					this.queue.push(new Analytics.Event('click'));
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
					this.queue.empty();
					expect(this.queue.send()).to.be(undefined);
				});

				it('is a no-op is there is an existing pending request', function() {
					this.queue.request = {};
					expect(this.queue.send()).to.be(undefined);
				});

				it('moves the queue into a pending set', function() {
					this.queue.send();
					expect(this.queue._pending).to.have.length(1);
				});

				it('empties the queue', function() {
					this.queue.send();
					expect(this.queue.length()).to.be(0);
				});

				it('creates an HTTP request to send the queue', function() {
					this.queue.send();
					expect(this.queue.request).to.be.a(Http);
				});

				it('adds the event queue to the request data', function() {
					this.queue.send();
					expect(this.queue.request.data).to.have.property('events', this.queue._queue);
				});

				it('returns the number of sent items', function() {
					expect(this.queue.send()).to.be(1);
				});

				describe('Response', function() {

					beforeEach(function() {
						this.handler = sinon.spy(this.queue, '_onReceived');
						this.callback = sinon.spy();
						this.queue.send(this.callback);
					});

					afterEach(function() {
						this.xhr.restore();
					});

					describe('Always', function() {

						beforeEach(function() {
							this.request().respond(200);
						});

						it('deletes the request', function() {
							expect(this.queue.request).to.not.be.ok();
						});

						it('calls the callback', function() {
							expect(this.callback.calledOnce).to.be(true);
						});

						it('calls the callback with node-style arguments', function() {
							expect(this.callback.calledWith(null, sinon.match.object)).to.be(true);
						});

					});

					describe('Success', function() {

						beforeEach(function() {
							this.request().respond(200);
						});

						it('clears the queue', function() {
							expect(this.queue.length()).to.be(0);
						});

					});

					describe('Failure', function() {
						beforeEach(function() {
							this.queue.push(new Analytics.Event('click2'));
							this.request().respond(400);
						});

						it('pushes pending items onto the front of the queue', function() {
							expect(this.queue._queue[0]).to.have.property('name', 'click');
							expect(this.queue.length()).to.be(2);
						});

					});

				});

			});

		});

	});

});