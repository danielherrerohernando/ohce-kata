const { expect } = require('chai');
const { greetUser, goodbyeUser } = require('../../src/greetings');

describe('Unit test - Greetings Handler', () => {
	const greetDaniel = greetUser('Daniel');

	it('Should greet user including the username', () => {
		const greeting = greetDaniel();
		expect(greeting).to.equal('¡Buenos días Daniel!');
	});

	it('Should greet user including the username and depending on current time - Morning', () => {
		const greeting = greetDaniel(8);
		expect(greeting).to.equal('¡Buenos días Daniel!');
	});

	it('Should greet user including the username and depending on current time - Afternoon', () => {
		const greeting = greetDaniel(15);
		expect(greeting).to.equal('¡Buenas tardes Daniel!');
	});

	it('Should greet user including the username and depending on current time - Night', () => {
		const greeting = greetDaniel(23);
		expect(greeting).to.equal('¡Buenas noches Daniel!');
	});

	it('Should say goodbye to the user including the username', () => {
		const goodbye = goodbyeUser('Daniel');
		expect(goodbye).to.equal('Adios Daniel');
	});
});
