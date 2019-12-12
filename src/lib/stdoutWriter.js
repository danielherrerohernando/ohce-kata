const chalk = require('chalk');

const write = type => data => {
	if (!data) return;
	if (type === 'greet') return console.log(chalk.green.bold(data));
	if (type === 'feedback') return console.log(chalk.red.underline.bold(data));
	return console.log(data);
};

module.exports = { write };
