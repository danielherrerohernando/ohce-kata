const { argv } = require('yargs')
	.demandCommand(1)
	.usage('Usage: $0 yourName [options]')
	.example(
		'$0 Daniel --language=en',
		'It launches the cli app and you can interact with it, it will use English to talk to you'
	)
	.alias('l', 'language')
	.nargs('l', 1)
	.describe('l', 'Choose a language')
	.help('h')
	.alias('h', 'help')
	.epilog('copyright 2019');

const languages = {
	es: {
		GOODMORNING: 'Buenos días',
		GOODAFTERNOON: 'Buenas tardes',
		GOODNIGHT: 'Buenas noches',
		BYE: 'Adiós',
		NICEWORD: '¡Bonita palabra!',
		NICESENTENCE: '¡Bonita frase!'
	},
	en: {
		GOODMORNING: 'Good morning',
		GOODAFTERNOON: 'Good afternoon',
		GOODNIGHT: 'Good night',
		BYE: 'Bye',
		NICEWORD: '¡Nice word!',
		NICESENTENCE: '¡Nice sentence!'
	},
	hu: {
		GOODMORNING: 'Jó reggelt',
		GOODAFTERNOON: 'Jó napot',
		GOODNIGHT: 'Jó estét',
		BYE: 'Viszlát',
		NICEWORD: '¡Szép szó!',
		NICESENTENCE: '¡Szép mondat!'
	}
};

const chosenLanguage = languages[argv.language] || languages.es;

module.exports = { ...chosenLanguage, STOP: 'Stop!', USERNAME: argv._.join(' ') };
