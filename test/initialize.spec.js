describe('ValetIO', function() {
	it('should not expose its private methods', function() {
		expect(window.ValetIO).to.be(undefined);
	});

	it('should expose a public API', function() {
		expect(window.Valet).to.be.defined;
	});
});