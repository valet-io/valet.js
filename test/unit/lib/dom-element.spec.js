define(['src/lib/dom-element'], function(DOMElement) {
	'use strict';

	it('is an EventEmitter', function() {
		expect(new DOMElement()).to.have.property('emit');
	});

	describe('Creating', function() {

		it('is a div by default', function() {
			expect(DOMElement.create().element.tagName).to.be('DIV');
		});

		it('can be a custom tag', function() {
			expect(DOMElement.create('span').element.tagName).to.be('SPAN');
		});

		it('can set an ID', function() {
			expect(DOMElement.create(null, 'myId').element.getAttribute('id')).to.be('myId');
		});

		it('can set other attributes', function() {
			expect(DOMElement.create(null, null, {name: 'myName'}).element.getAttribute('name')).to.be('myName');
		});

		it('starts hidden', function() {
			expect(DOMElement.create().element.style.display).to.be('none');
		});

		it('can wrap an existing DOM node', function() {
			var element = document.createElement('div');
			expect(new DOMElement(element).element).to.be(element);
		});

	});

	describe('Insertion/Removal', function() {

		beforeEach(function() {
			this.domElement = DOMElement.create();
		});

		it('can be appended to a target with #prepend', function() {
			this.domElement.prepend(document.body);
			expect(document.body.firstChild).to.be(this.domElement.element);
		});

		it('can be prepended to a target with #append', function() {
			this.domElement.append(document.body);
			expect(document.body.lastChild).to.be(this.domElement.element);
		});

		it('can be removed with #remove', function() {
			this.domElement.append(document.body).remove();
			expect(document.body.childNodes).to.not.contain(this.domElement.element);
		});

	});

	describe('Visibility', function() {

		beforeEach(function() {
			this.domElement = DOMElement.create().append(document.body);
			sinon.spy(this.domElement, 'emit');
		});

		describe('#show', function() {

			beforeEach(function() {
				this.domElement.show();
			});

			it('emits a show event', function() {
				sinon.assert.calledWith(this.domElement.emit, 'show');
			});

			it('sets the display to block', function() {
				expect(this.domElement.element.style.display).to.be('block');
			});

		});

		describe('#hide', function() {

			beforeEach(function () {
				this.domElement.hide();
			});

			it('emits a hide event', function() {
				sinon.assert.calledWith(this.domElement.emit, 'hide');
			});

			it('sets the display to none', function() {
				expect(this.domElement.element.style.display).to.be('none');
			});

		});

		describe('#isVisible', function() {

			beforeEach(function() {
				this.domElement.show();
			});

			it('evaluates whether display is none', function() {
				expect(this.domElement.isVisible()).to.be(true);
			});

		});

		describe('#toggle', function() {

			beforeEach(function() {
				sinon.spy(this.domElement, 'isVisible');
				sinon.spy(this.domElement, 'show');
				sinon.spy(this.domElement, 'hide');

				this.domElement.toggle();
			});

			it('uses #isVisible to flip the state', function() {
				sinon.assert.calledOnce(this.domElement.isVisible);
			});

			it('calls the appropriate state method', function() {
				sinon.assert.calledOnce(this.domElement.show);
			});

		});

	});


});