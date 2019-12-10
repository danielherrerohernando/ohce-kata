#!/usr/bin/env node

const readline = require('readline');
const { write } = require('./lib/stdoutWriter');
const { greetUser, goodbyeUser } = require('./lib/greetings');
const { reverseInput, palindromeChecker } = require('./lib/inputHandler');

global.getCurrentHour = require('./lib/timeHandler').getCurrentHour;

const userName = process.argv[2] || process.env.USER || '';

const rl = readline.createInterface({
	input: process.stdin,
	output: null
});

const init = () => {
	write(greetUser(userName, getCurrentHour()));
	rl.on('line', input => {
		if (input === 'Stop!') {
			write(goodbyeUser(userName));
			process.exit(0);
		}
		const output = reverseInput(input);
		write(output);
		write(palindromeChecker(input, output));
	});
};

process.env.NODE_ENV !== 'test' ? init() : require('../test/testHelper/mocks')(init);
