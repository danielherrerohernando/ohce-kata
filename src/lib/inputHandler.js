const { NICEWORD } = require('./constants');

const reverseInput = input =>
	input
		.split('')
		.reverse()
		.join('');

const palindromeChecker = (input, output) => (input === output ? NICEWORD : null);

module.exports = { reverseInput, palindromeChecker };
