'use strict';

const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

if (isMainThread) {
    module.exports = async function parseJSAsync(raw) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: raw
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    };
} else {
    const start = process.hrtime();
    const json = JSON.parse(workerData);
    const [s, ns] = process.hrtime(start);
    const ms = s * 1000 + ns / 1e6;
    parentPort.postMessage({
        ms,
        json
    });
}
