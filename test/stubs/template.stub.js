define([], function() {
	'use strict';
	return function template(name, data, callback) {
		callback(null, '<style>styles</style><div></div>');
	};
})