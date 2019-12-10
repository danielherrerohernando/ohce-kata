#!/usr/bin/env node

const readline = require('readline');
const { greetUser, goodbyeUser } = require('./greetings');
const { reverseInput } = require('./inputHandler');

global.getCurrentHour = require('./timeHandler').getCurrentHour;

const userName = process.argv[2] || process.env.USER || '';

const rl = readline.createInterface({
	input: process.stdin,
	output: null
});

const init = () => {
	process.stdout.write(greetUser(userName, getCurrentHour()) + '\n');
	rl.on('line', input => {
		if (input === 'Stop!') {
			process.stdout.write(goodbyeUser(userName) + '\n');
			process.exit(0);
		}
		process.stdout.write(reverseInput(input) + '\n');
	});
};

process.env.NODE_ENV !== 'test' ? init() : require('../test/testHelper/mocks')(init);
