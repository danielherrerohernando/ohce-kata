const { GOODMORNING, GOODAFTERNOON, GOODNIGHT, BYE } = require('./constants');

const greetUser = (username, hour = 8) => {
	if (hour < 12) return `¡${GOODMORNING} ${username}!`;
	if (hour >= 12 && hour < 20) return `¡${GOODAFTERNOON} ${username}!`;
	return `¡${GOODNIGHT} ${username}!`;
};

const goodbyeUser = username => `${BYE} ${username}`;

const getCurrentHour = () => new Date().getHours();

module.exports = { greetUser, goodbyeUser, getCurrentHour };
