const chai = require('chai');
chai.use(require('chai-string'));
const { expect } = chai;
const testHelper = require('../testHelper/testHelper');
const [mockTimeMorning, mockTimeAfternoon, mockTimeNight] = [9, 16, 23];

let basicProcess;

describe('Integration-E2E Tests', () => {
	before(() => {
		basicProcess = testHelper.execute('./src/index.js');
	});
	describe('The ohce cli app', () => {
		it('Should greet user on startup - Morning', async () => {
			const promiseFromChildProcess = basicProcess('Daniel');
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.startsWith('¡Buenos días Daniel!');
		});
		it('Should greet user on startup - Afternoon', async () => {
			const promiseFromChildProcess = basicProcess('Daniel');
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeAfternoon });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.startsWith('¡Buenas tardes Daniel!');
		});
		it('Should greet user on startup - Night', async () => {
			const promiseFromChildProcess = basicProcess('Daniel');
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeNight });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.startsWith('¡Buenas noches Daniel!');
		});
	});
});
