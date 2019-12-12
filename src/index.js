#!/usr/bin/env node

const readline = require('readline');
const { write } = require('./lib/stdoutWriter');
const { greetUser } = require('./lib/greetings');
const { inputHandler } = require('./lib/inputHandler');

global.getCurrentHour = require('./lib/timeHandler').getCurrentHour;
const userName = process.argv[2] || process.env.USER || '';

const greetUsername = greetUser(userName);
const writeGreet = write('greet');

const rl = readline.createInterface({ input: process.stdin });

const init = () => {
	writeGreet(greetUsername(getCurrentHour()));
	rl.on('line', inputHandler(userName));
};

process.env.NODE_ENV !== 'test' ? init() : require('../test/testHelper/mocks')(init);
