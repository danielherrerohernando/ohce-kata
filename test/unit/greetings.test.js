const { expect } = require('chai');
const { greetUser } = require('../../src/greetings');

describe('Unit test - Greetings Handler', () => {
	it('Should greet user including the username', () => {
		const greeting = greetUser('Daniel');
		expect(greeting).to.equal('¡Buenos días Daniel!');
	});
});
