const { spawn } = require('child_process');
const concat = require('concat-stream');

const execute = processPath => (options, inputs = []) => {
	const commandInput = Array.isArray(options) ? options : [options];
	const childProcess = spawn('node', [processPath, ...commandInput], { stdio: [null, null, null, 'ipc'] });

	const inputFeeder = inputs => {
		if (!inputs.length) return childProcess.stdin.end();
		currentInputTimeout = setTimeout(() => {
			childProcess.stdin.write(inputs[0]);
			inputFeeder(inputs.slice(1));
		}, 200);
	};

	const promise = new Promise((resolve, reject) => {
		childProcess.stdin.setEncoding('utf-8');
		childProcess.stdout.setEncoding('utf-8');
		childProcess.on('error', reject);
		childProcess.stderr.once('data', err => reject(err));
		inputFeeder(inputs);
		childProcess.stdout.pipe(concat(result => resolve(result)));
	});

	promise.relatedProcess = childProcess;

	return promise;
};

module.exports = { execute };
