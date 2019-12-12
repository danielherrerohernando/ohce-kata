const { NICEWORD, NICESENTENCE } = require('./constants');

const purifyString = str => str.toLowerCase().replace(/[^A-Za-z]/g, '');

const reverseInput = input =>
	input
		.split('')
		.reverse()
		.join('');

const palindromeChecker = (input, output) => {
	if (purifyString(input) === purifyString(output)) return input.includes(' ') ? NICESENTENCE : NICEWORD;
	return null;
};

module.exports = { reverseInput, palindromeChecker };
