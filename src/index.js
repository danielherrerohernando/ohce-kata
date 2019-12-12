#!/usr/bin/env node
const readline = require('readline');
const { write } = require('./lib/stdoutWriter');
const { greetUser } = require('./lib/greetings');
const { inputHandler } = require('./lib/inputHandler');
const { USERNAME } = require('./lib/userOptions');

global.getCurrentHour = require('./lib/timeHandler').getCurrentHour;

const greetUsername = greetUser(USERNAME);
const writeGreet = write('greet');

const rl = readline.createInterface({ input: process.stdin });

const init = () => {
	writeGreet(greetUsername(getCurrentHour()));
	rl.on('line', inputHandler(USERNAME));
};

process.env.NODE_ENV !== 'test' ? init() : require('../test/testHelper/mocks')(init);
