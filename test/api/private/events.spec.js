define(['api/private/events'], function(events) {
	describe('DOM Events', function() {

		it('can listen for click events', function() {
			expect(events).to.have.property('attachListeners')
		});
		
	});

});