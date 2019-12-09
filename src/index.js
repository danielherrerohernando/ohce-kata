#!/usr/bin/env node

const { greetUser } = require('./greetings');
const userName = process.argv[2] || process.env.USER;

process.stdout.write(greetUser(userName));
