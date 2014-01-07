var tests = [];
for (var file in window.__karma__.files) {
    if (/\.spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
	baseUrl: '/base',
	deps: tests,
	callback: window.__karma__.start,
	paths: {
		text: 'components/text/text',
		domReady: 'components/domReady/text',
		spin: 'components/spin/spin',
		hbs: 'components/require-handlebars-plugin/hbs'
	}
});