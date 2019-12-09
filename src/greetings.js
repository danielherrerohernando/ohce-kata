const { GOODMORNING, GOODAFTERNOON, GOODNIGHT } = require('./constants');

const greetUser = (username, hour = 8) => {
	if (hour < 12) return `¡${GOODMORNING} ${username}!`;
	if (hour >= 12 && hour < 20) return `¡${GOODAFTERNOON} ${username}!`;
	return `¡${GOODNIGHT} ${username}!`;
};

const goodbyeUser = username => {};

module.exports = { greetUser, goodbyeUser };
