define(['require'], function(require) {
	'use strict';

	function TestUtil() {
		this.stubs = {};
	}

	TestUtil.prototype = {
		stub: function(name, stub) {
			var stubs = this.stubs;

			requirejs.undef(name);
			if (typeof stub === 'string') {
				define(name, [stub], function(Stub) {
					stubs[name] = Stub;
					return Stub;
				});
			} else {
				define(name, [], function() {
					stubs[name] = stub;
					return stub;
				});
			}
			
			return this;
		},
		load: function(name, callback) {
			this.stubs[name] = callback;
			requirejs.undef(name);
			requirejs([name], callback);
			return this;
		},
		reset: function() {
			for (var stub in this.stubs) {
				requirejs.undef(stub);
			}
			this.stubs = {};
		}
	};

	return TestUtil;
});