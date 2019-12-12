const { NICEWORD, NICESENTENCE, STOP } = require('./userOptions');
const { write } = require('./stdoutWriter');
const { goodbyeUser } = require('./greetings');

const writeStd = write();
const writeGreet = write('greet');
const writeFeedback = write('feedback');

const purifyString = str => str.toLowerCase().replace(/[^A-Za-z]/g, '');

const reverseInput = input => input.split('').reverse().join('');

const palindromeChecker = (input, output) => {
	if (purifyString(input) === purifyString(output)) return input.includes(' ') ? NICESENTENCE : NICEWORD;
	return null;
};

const inputHandler = userName => input => {
	if (input === STOP) {
		writeGreet(goodbyeUser(userName));
		process.exit(0);
	}
	const output = reverseInput(input);
	writeStd(output);
	writeFeedback(palindromeChecker(input, output));
};

module.exports = { reverseInput, palindromeChecker, inputHandler };
