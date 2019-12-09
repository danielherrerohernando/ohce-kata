const { expect } = require('chai');
const testHelper = require('../testHelper/testHelper');

describe('Integration-E2E Tests', () => {
	describe('The ohce cli app', () => {
		it('Should greet user on startup', async () => {
			const output = await testHelper.execute('./src/index.js');
			expect(output).to.equal('¡Buenos días!');
		});
	});
});
