var tests = [];
for (var file in window.__karma__.files) {
    if (/\.spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
	baseUrl: '/src',
	deps: tests,
	callback: window.__karma__.start
});