const { expect } = require('chai');
const { reverseInput } = require('../../src/inputHandler');

describe('Unit test - Input Handler', () => {
	it('Should reverse input', () => {
		expect('epilef').to.equal(reverseInput('felipe'));
	});
});
