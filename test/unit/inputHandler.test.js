const { expect } = require('chai');
const { reverseInput, palindromeChecker } = require('../../src/lib/inputHandler');

describe('Unit test - Input Handler', () => {
	it('Should reverse input', () => {
		expect('epilef').to.equal(reverseInput('felipe'));
	});
	it('Should detect palindromes and return a nice msg if so', () => {
		expect('¡Bonita palabra!').to.equal(palindromeChecker('otto', 'otto'));
	});
	it('Should detect palindromes and return null when it is not a palindrome', () => {
		expect(null).to.equal(palindromeChecker('guidesmiths', 'shtimsediug'));
	});
});
