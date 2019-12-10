const { expect } = require('chai').use(require('chai-string'));
const testHelper = require('../testHelper/testHelper');
const [mockTimeMorning, mockTimeAfternoon, mockTimeNight] = [9, 16, 23];

let basicProcess;

describe('Integration-E2E Tests', () => {
	before(() => {
		basicProcess = testHelper.execute('./src/index.js');
	});
	describe('The ohce cli app basic greetings', () => {
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
	describe('The ohce cli app handles input', () => {
		it('Should greet user on startup - Morning & Reverse some input & Handle stop', async () => {
			const promiseFromChildProcess = basicProcess('Daniel', ['lightning', 'stop']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal('¡Buenos días Daniel!\ngninthgil\npots\nAdios Daniel');
		});
	});
});
