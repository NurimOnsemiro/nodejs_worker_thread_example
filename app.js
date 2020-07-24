const path = require('path');
const envInfo = require('./env_info.json');
const {
    Worker
} = require('worker_threads');

let workerPath = path.join(__dirname, './worker.js');
let resultArr = new Array(envInfo.numThreads + 1);

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
        resultArr[i] = doSomething();
    }
    console.timeEnd('main');

    for (let i = 0; i < envInfo.numThreads; i++) {
        console.log(`result : ${resultArr[i]}`);
    }
}

function doSomething() {
    let data = 0;
    for (let i = 0; i < envInfo.jobSize; i++) {
        data += i;
    }
    return data;
}