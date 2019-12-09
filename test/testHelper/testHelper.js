const { spawn } = require('child_process');
const concat = require('concat-stream');

const execute = processPath => {
	const childProcess = spawn('node', [processPath]);
	const promise = new Promise((resolve, reject) => {
		childProcess.stdout.setEncoding('utf-8');
		childProcess.on('error', reject);
		childProcess.stderr.once('data', err => reject(err));
		childProcess.stdout.pipe(concat(result => resolve(result)));
	});
	return promise;
};

module.exports = { execute };
