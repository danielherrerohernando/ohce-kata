const { expect } = require('chai').use(require('chai-string'));

const { execute } = require('../testHelper/testHelper');
const [mockTimeMorning, mockTimeAfternoon, mockTimeNight] = [9, 16, 23];

let basicProcess;

describe('Integration-E2E Tests', () => {
	before(() => {
		basicProcess = execute('./src/index.js');
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
	describe('The ohce cli app knows when to stop and says goodbye', () => {
		it('Should stop when receives Stop! input and prints goodbye msg', async () => {
			const promiseFromChildProcess = basicProcess('Daniel', ['Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.endsWith('Adios Daniel\n');
		});
	});
	describe('The ohce cli app handles input', () => {
		it('Should greet user on startup - Morning & Reverse some input & Handle stop', async () => {
			const promiseFromChildProcess = basicProcess('Daniel', ['lightning\n', 'Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal('¡Buenos días Daniel!\ngninthgil\nAdios Daniel\n');
		});
		it('Gets happy and prints a nice msg when detects a palindrome', async () => {
			const promiseFromChildProcess = basicProcess('Daniel', ['otto\n', 'Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.contain('¡Bonita palabra!');
		});
	});
	describe('The ohce cli app handles complex input', () => {
		it('Should greet user on startup - Afternoon & Reverse a palindrome sentence with commas and uppercase letters & Handle stop', async () => {
			const promiseFromChildProcess = basicProcess('Rudolf', ['A man, a plan, a canal. Panama\n', 'Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeAfternoon });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal('¡Buenas tardes Rudolf!\namanaP .lanac a ,nalp a ,nam A\n¡Bonita frase!\nAdios Rudolf\n');
		});
	});
});
