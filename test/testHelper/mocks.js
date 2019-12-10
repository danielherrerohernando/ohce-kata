module.exports = init => {
	process.on('message', mock => {
		if (mock.mockTime) getCurrentHour = () => mock.mockTime;
		if (mock.start) {
			init();
			process.disconnect();
		}
	});
};
