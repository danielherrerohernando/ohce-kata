#!/usr/bin/env node

const { greetUser } = require('./greetings');
let { getCurrentHour } = require('./timeHandler');

const userName = process.argv[2] || process.env.USER || '';
const greetUsername = greetUser(userName);

const init = () => {
	process.stdout.write(greetUsername(getCurrentHour()) + '\n');
};

process.on('message', mock => {
	if (mock.mockTime) getCurrentHour = () => mock.mockTime;
	if (mock.start) {
		init();
		process.disconnect();
	}
});

process.env.NODE_ENV !== 'test' && init();
