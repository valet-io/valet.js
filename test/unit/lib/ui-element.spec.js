describe('UIElement', function() {
	'use strict';


	require.undef('src/lib/template');
	define(
		'src/lib/template',
		['test/stubs/template.stub'],
		function(templateStub) {
			return sinon.spy(templateStub);
		}
	);

	define(['src/lib/ui-element', 'src/lib/template'], function(UIElement, template) {

		it('is an EventEmitter', function() {
			expect(new UIElement()).to.have.property('emit');
		});

		beforeEach(function() {
			this.uiElement = UIElement.create();
			sinon.spy(this.uiElement, 'emit');
		});

		describe('Creating', function() {

			it('is a div by default', function() {
				expect(this.uiElement.element.tagName).to.be('DIV');
			});

			it('can be a custom tag', function() {
				expect(UIElement.create('span').element.tagName).to.be('SPAN');
			});

			it('can set an ID', function() {
				expect(UIElement.create(null, 'myId').element.getAttribute('id')).to.be('myId');
			});

			it('can set other attributes', function() {
				expect(UIElement.create(null, null, {name: 'myName'}).element.getAttribute('name')).to.be('myName');
			});

			it('starts hidden', function() {
				expect(this.uiElement.element.style.display).to.be('none');
			});

			it('can wrap an existing DOM node', function() {
				var element = document.createElement('div');
				expect(new UIElement(element).element).to.be(element);
			});

		});

		describe('Insertion/Removal', function() {

			it('can be appended to a target with #prepend', function() {
				this.uiElement.prepend(document.body);
				expect(document.body.firstChild).to.be(this.uiElement.element);
			});

			it('can be prepended to a target with #append', function() {
				this.uiElement.append(document.body);
				expect(document.body.lastChild).to.be(this.uiElement.element);
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

			beforeEach(function(done) {
				this.uiElement.templateName = 'templateName';
				this.data = {templated: 'value'};
				template.reset();

				this.uiElement.load(this.data, done);
			});

			it('calls the template with the name and data', function() {
				sinon.assert.calledWith(template, this.uiElement.templateName, this.data);
			});

			it('sets the element innerHTML', function() {
				expect(this.uiElement.element.innerHTML).to.match(/^<style>/);
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

	require.undef('src/lib/template');

});