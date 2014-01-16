define(['test/util', 'require'], function(TestUtil, require) {
	'use strict';

	describe('Modal Instance/API', function() {

		beforeEach(function(done) {
			this.testUtil = new TestUtil();

			require(['src/ui-controllers/modal'], function(Modal) {
				function FakeModal() {
					this.load = sinon.spy();
					Modal.call(this);
				}
				FakeModal.prototype = Modal.prototype;
				this.Modal = sinon.spy(FakeModal);
				done();
			}.bind(this));
		});

		beforeEach(function(done) {
			this.config = {modal: {}};

			this.testUtil.stub('src/ui-controllers/modal', this.Modal);
			this.testUtil.stub('src/config', this.config);

			this.testUtil.load('src/api/modal', function(modalApi) {
				this.api = modalApi;
				this.modal = this.Modal.firstCall.thisValue;
				done();
			}.bind(this));
		});

		afterEach(function() {
			this.testUtil.reset();
		});

		it('should be configured', function() {
			sinon.assert.calledWith(this.Modal, this.config.modal);
		});

		it('should begin load', function() {
			sinon.assert.called(this.modal.load);
		});

		it('should expose the #show method', function() {
			expect(this.api).to.have.property('show');
		});

		it('should expose the #hide method', function() {
			expect(this.api).to.have.property('hide');
		});

		it('should expose the #toggle method', function() {
			expect(this.api).to.have.property('toggle');
		});

		it('should expose the #isVisible method', function() {
			expect(this.api).to.have.property('isVisible');
		});

		it('should expose the #on method', function() {
			expect(this.api).to.have.property('on');
		});

		it('should not expose any private methods', function() {
			expect(this.api).to.not.have.property('load');
		});

	});

});