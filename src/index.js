#!/usr/bin/env node

const readline = require('readline');
const { greetUser, goodbyeUser } = require('./greetings');
const { reverseInput } = require('./inputHandler');
let { getCurrentHour } = require('./timeHandler');

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

process.on('message', mock => {
	if (mock.mockTime) getCurrentHour = () => mock.mockTime;
	if (mock.start) {
		init();
		process.disconnect();
	}
});

process.env.NODE_ENV !== 'test' && init();
