const { expect } = require('chai');
const testHelper = require('../testHelper/testHelper');

let basicProcess;

describe('Integration-E2E Tests', () => {
	before(() => {
		basicProcess = testHelper.execute('./src/index.js');
	});
	describe('The ohce cli app', () => {
		it('Should greet user on startup', async () => {
			const output = await basicProcess('Daniel');
			expect(output).to.equal('¡Buenos días Daniel!');
		});
	});
});
