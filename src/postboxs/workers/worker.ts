
import { isMainThread, parentPort, workerData } from 'worker_threads';
console.log('Worker thread');   

console.log('mainThread?', isMainThread);

const { data } = workerData;
console.log('this is worker', data);
parentPort.postMessage(data + ' from worker!!');


