const { spawn } = require('child_process');
const concat = require('concat-stream');

const execute = processPath => userName => {
	const childProcess = spawn('node', [processPath, userName], { stdio: [null, null, null, 'ipc'] });
	const promise = new Promise((resolve, reject) => {
		childProcess.stdout.setEncoding('utf-8');
		childProcess.on('error', reject);
		childProcess.stderr.once('data', err => reject(err));
		childProcess.stdout.pipe(concat(result => resolve(result)));
	});
	promise.relatedProcess = childProcess;
	return promise;
};

module.exports = { execute };
