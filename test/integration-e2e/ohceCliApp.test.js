const { expect } = require('chai').use(require('chai-string'));

const { execute } = require('../testHelper/testHelper');
const [mockTimeMorning, mockTimeAfternoon, mockTimeNight] = [9, 16, 23];

let basicProcess;

describe('Integration-E2E Tests', () => {
	before(() => {
		basicProcess = execute('./src/index.js');
	});
	describe('The ohce cli app basic greetings', () => {
		it('Should greet user on startup - Morning - Default language is Spanish', async () => {
			const promiseFromChildProcess = basicProcess('Daniel');
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.startsWith('¡Buenos días Daniel!');
		});

		it('Should greet user on startup - Afternoon - Default language is Spanish', async () => {
			const promiseFromChildProcess = basicProcess('Daniel');
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeAfternoon });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.startsWith('¡Buenas tardes Daniel!');
		});

		it('Should greet user on startup - Night - Default language is Spanish', async () => {
			const promiseFromChildProcess = basicProcess('Daniel');
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeNight });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.startsWith('¡Buenas noches Daniel!');
		});
	});
	describe('The ohce cli app knows when to stop and says goodbye - Default language is Spanish', () => {
		it('Should stop when receives Stop! input and prints goodbye msg', async () => {
			const promiseFromChildProcess = basicProcess('Daniel', ['Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.endsWith('Adiós Daniel\n');
		});
	});
	describe('The ohce cli app handles input', () => {
		it('Should greet user on startup - Morning & Reverse some input & Handle stop', async () => {
			const promiseFromChildProcess = basicProcess('Daniel', ['lightning\n', 'Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal('¡Buenos días Daniel!\ngninthgil\nAdiós Daniel\n');
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
			expect(output).to.equal('¡Buenas tardes Rudolf!\namanaP .lanac a ,nalp a ,nam A\n¡Bonita frase!\nAdiós Rudolf\n');
		});
	});
	describe('The ohce cli app is multilingual', () => {
		it('Should greet user in English - afternoon if the option language is set to "en"', async () => {
			const promiseFromChildProcess = basicProcess(['Mattias', '--language=en'], ['Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeAfternoon });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal('¡Good afternoon Mattias!\nBye Mattias\n');
		});
		it('Should greet user in Hungarian - night if the option language is set to "hu"', async () => {
			const promiseFromChildProcess = basicProcess(['Mattias', '--language=hu'], ['Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeNight });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal('¡Jó estét Mattias!\nViszlát Mattias\n');
		});
		it('Should greet user in Spanish - morning if the option language is set to a non-available language', async () => {
			const promiseFromChildProcess = basicProcess(['Mattias', '--language=sk'], ['Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeMorning });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal('¡Buenos días Mattias!\nAdiós Mattias\n');
		});
	});
	describe('The ohce cli app shows suggestions for similar commands', () => {
		it('Should show a suggestion when the user types sth similar to stop', async () => {
			const promiseFromChildProcess = basicProcess('Lola', ['stop\n', 'Stop!\n']);
			const childProcess = promiseFromChildProcess.relatedProcess;
			childProcess.send({ mockTime: mockTimeAfternoon });
			childProcess.send({ start: 'start' });
			const output = await promiseFromChildProcess;
			expect(output).to.equal(
				'¡Buenas tardes Lola!\npots\n¿Querías decir "Stop!"?, si quieres salir de la app solo escribe "Stop!"\nAdiós Lola\n'
			);
		});
	});
});
