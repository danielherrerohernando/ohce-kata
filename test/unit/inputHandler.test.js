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
	it('Should detect palindromes even when they are sentences with commas and spaces (I)', () => {
		expect('¡Bonita frase!').to.equal(palindromeChecker('race car', 'rac ecar'));
	});
	it('Should detect palindromes even when they are sentences with commas and spaces (II)', () => {
		expect('¡Bonita frase!').to.equal(
			palindromeChecker('A man, a plan, a canal. Panama', 'amanaP .lanac a ,nalp a ,nam A')
		);
	});
	it('Should detect palindromes even when they are sentences with commas and spaces, or return null when it is not', () => {
		expect(null).to.equal(palindromeChecker('A man, a ham', 'mah a ,nam A'));
	});
});
