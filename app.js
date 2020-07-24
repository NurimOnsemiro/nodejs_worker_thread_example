const path = require('path');
const envInfo = require('./env_info.json');
const {Worker} = require('worker_threads');

let workerPath = path.join(__dirname, './worker.js');

if (envInfo.useThread) {
    for (let i = 0; i < envInfo.numThreads; i++) {
        let myWorker = new Worker(workerPath);
        myWorker.postMessage(envInfo.jobSize);
        //INFO: 스레드로부터 데이터를 받음
        myWorker.on('message', result => {
            console.log(`${myWorker.threadId} result : ${result}`);
        });
    }
} else {
    console.time('main');
    for (let i = 0; i < envInfo.numThreads; i++) {
        doSomething();
    }
    console.timeEnd('main');
}

function doSomething() {
    let data = 0;
    for (let i = 0; i < envInfo.jobSize; i++) {
        data += i;
    }
    console.log(`result : ${data}`);
}