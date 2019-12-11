const { GOODMORNING, GOODAFTERNOON, GOODNIGHT, BYE } = require('./constants');

const isMorning = hour => hour >= 6 && hour < 12;
const isAfternoon = hour => hour >= 12 && hour < 20;

const greetUser = (username, hour = 8) => {
	return isMorning(hour) ? `¡${GOODMORNING} ${username}!` :
		isAfternoon(hour) ? `¡${GOODAFTERNOON} ${username}!` :
			`¡${GOODNIGHT} ${username}!`;
};

const goodbyeUser = username => `${BYE} ${username}`;

module.exports = { greetUser, goodbyeUser };
