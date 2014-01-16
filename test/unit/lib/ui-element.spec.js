define(['test/util'], function(TestUtil) {
	'use strict';

	beforeEach(function(done) {
		this.testUtil = new TestUtil();
		this.template = {
			fetch: function() {}
		};
		this.testUtil.stub('src/lib/template', this.template);

		this.testUtil.load('src/lib/ui-element', function(uie) {
			this.UIElement = uie;
			done();
		}.bind(this));
	});

	afterEach(function() {
		this.testUtil.reset();
	});

	describe('UIElement', function() {

		it('is an EventEmitter', function() {
			expect(new this.UIElement()).to.have.property('emit');
		});

		beforeEach(function() {
			this.uiElement = new this.UIElement();
			sinon.spy(this.uiElement, 'emit');
		});

		describe('Creating', function() {

			it('is a div by default', function() {
				expect(this.uiElement.element.tagName).to.be('DIV');
			});

			it('can be a custom tag', function() {
				expect(new this.UIElement('span').element.tagName).to.be('SPAN');
			});

			it('can set an ID', function() {
				expect(new this.UIElement(null, 'myId').element.getAttribute('id')).to.be('myId');
			});

			it('can set other attributes', function() {
				expect(new this.UIElement(null, null, {name: 'myName'}).element.getAttribute('name')).to.be('myName');
			});

			it('starts hidden', function() {
				expect(this.uiElement.element.style.display).to.be('none');
			});

		});

		describe('Insertion/Removal', function() {

			beforeEach(function() {
				this.other = document.createElement('div');
				document.body.appendChild(this.other);
			});

			afterEach(function() {
				document.body.removeChild(this.other);
			});

			it('can be appended to a target with #prepend', function() {
				this.uiElement.prepend(document.body);
				expect(document.body.firstChild).to.be(this.uiElement.element);
			});

			it('can be prepended to a target with #append', function() {
				this.uiElement.append(document.body);
				expect(document.body.lastChild).to.be(this.uiElement.element);
			});

			it('can be inserted before a sibling with #insertBefore', function() {
				this.uiElement.insertBefore(this.other);
				expect(this.other.previousSibling).to.be(this.uiElement.element);
			});

			it('can be inserted after a sibling with #insertAfter', function() {
				this.uiElement.insertAfter(this.other);
				expect(this.other.nextSibling).to.be(this.uiElement.element);
			});

			it('can be removed with #remove', function() {
				this.uiElement.append(document.body).remove();
				expect(document.body.childNodes).to.not.contain(this.uiElement.element);
			});

		});

		describe('Visibility', function() {

			beforeEach(function() {
				this.uiElement.append(document.body);
			});

			describe('#show', function() {

				beforeEach(function() {
					this.uiElement.show();
				});

				it('emits a show event', function() {
					sinon.assert.calledWith(this.uiElement.emit, 'show');
				});

				it('sets the display to block', function() {
					expect(this.uiElement.element.style.display).to.be('block');
				});

			});

			describe('#hide', function() {

				beforeEach(function () {
					this.uiElement.hide();
				});

				it('emits a hide event', function() {
					sinon.assert.calledWith(this.uiElement.emit, 'hide');
				});

				it('sets the display to none', function() {
					expect(this.uiElement.element.style.display).to.be('none');
				});

			});

			describe('#isVisible', function() {

				beforeEach(function() {
					this.uiElement.show();
				});

				it('evaluates whether display is none', function() {
					expect(this.uiElement.isVisible()).to.be(true);
				});

			});

			describe('#toggle', function() {

				beforeEach(function() {
					sinon.spy(this.uiElement, 'isVisible');
					sinon.spy(this.uiElement, 'show');
					sinon.spy(this.uiElement, 'hide');

					this.uiElement.toggle();
				});

				it('uses #isVisible to flip the state', function() {
					sinon.assert.calledOnce(this.uiElement.isVisible);
				});

				it('calls the appropriate state method', function() {
					sinon.assert.calledOnce(this.uiElement.show);
				});

			});

		});

		describe('Template', function() {

			beforeEach(function() {
				sinon.stub(this.template, 'fetch')
					.withArgs('templateName')
					.yields(null, 'template');
			});

			beforeEach(function(done) {
				this.uiElement.templateName = 'templateName';
				this.data = {templated: 'value'};

				this.uiElement.load(this.data, done);
			});

			afterEach(function() {
				this.template.fetch.restore();
			});

			it('sets the element innerHTML', function() {
				expect(this.uiElement.element.innerHTML).to.be('template');
			});

			it('emits a ready event', function() {
				sinon.assert.calledWith(this.uiElement.emit, 'ready');
			});
		
		});

		describe('DOM Events', function() {

			beforeEach(function() {
				this.listen = this.uiElement.listen('custom');
			});

			it('can register DOM listeners', function() {
				expect(this.listen).to.have.property('events');
			});

			it('can chain on listen for DOM events only', function() {
				expect(this.listen).to.have.property('on');
			});

			it('proxies DOM events to the UIElement', function() {
				this.listen.emit('event');
				sinon.assert.calledWith(this.uiElement.emit, 'event');
			});

		});

	});

});