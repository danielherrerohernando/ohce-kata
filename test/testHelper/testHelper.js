const { spawn } = require('child_process');
const concat = require('concat-stream');

const execute = processPath => (userName, inputs = []) => {
	const childProcess = spawn('node', [processPath, userName], { stdio: [null, null, null, 'ipc'] });
	const inputFeeder = inputs => {
		if (!inputs.length) childProcess.stdin.end();
		setTimeout(() => {
			childProcess.stdin.write(inputs[0]);
			loop(inputs.slice(1));
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
