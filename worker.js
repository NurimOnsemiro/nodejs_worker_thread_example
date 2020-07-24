const {threadId, parentPort} = require('worker_threads');

/** @jobSize number */
parentPort.on('message', jobSize => {
    console.time(`${threadId} thread`);
    let result = doSomething(jobSize);
    console.timeEnd(`${threadId} thread`);
    //INFO: 메인스레드에게 데이터 전달
    parentPort.postMessage(result);

    //INFO: parentPort 이벤트를 종료시켜줘야 함
    parentPort.close();
});

/** @jobSize number */
function doSomething(jobSize) {
    let data = 0;
    for (let i = 0; i < jobSize; i++) {
        data += i;
    }
    return data;
}