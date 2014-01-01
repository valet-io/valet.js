define(function() {
	var config = {
		'donate-url': true,
		organization: null
	};
	var element = document.getElementById('valet-initialize');

	if (element) {
		for (var option in config) {
			var value = element.getAttribute('data-' + option);
			if (typeof value === 'string') {
				config[option] = value
			}
		}
	}

	for (var option in config) {
		if (typeof config[option] !== 'string') {
			
		}
	}

})