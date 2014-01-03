describe('Function.prototype.bind', function() {
	'use strict';

	before(function() {
		Function.prototype.bind = undefined;
	});

	define(['shims/function/bind'], function() {

		it('can bind the call context', function() {
			var ctx = {};
			function bound() {
				/*jshint validthis:true */
				expect(this).to.be(ctx);
			}
			bound.bind(ctx)();
		});

		it('passes arguments through', function() {
			function bound() {
				expect(arguments[0]).to.be('foo');
			}
			bound.bind()('foo');
		});

	});

});

