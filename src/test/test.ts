
import * as path from 'path';
import { Worker } from 'worker_threads';

export class Test{
    text: String = "text";
}

import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class TestService{

    private readonly logger =  new Logger(TestService.name);

    getHello(): String{
        this.logger.warn("testlog");
        return "hello";
    }
    


    private readonly pool: Worker[] = [];
    private readonly workerPath = path.join(__dirname, 'worker.js')

    async logic(testlist: Test[]) {
        const worker = this.getWorker();
        const result = await this.assignWorker(worker, testlist);
        return result;
    }

    private getWorker() {
        if (this.pool.length === 0) {
          this.createWorker();
        }
        return this.pool[0];
    }

    private createWorker() {
        const worker = new Worker(this.workerPath);
        worker.once('exit', (code) => {
          if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
        });
        
        this.pool.push(worker);
    }


    private async assignWorker(worker: Worker, testlist: Test[]): Promise<Test[]> {
        worker.postMessage(testlist);
    
        return new Promise((resolve, reject) => {

          const messageHandler = (result: Test[]) => {
            resolve(result);
            worker.removeListener('error', errorHandler);
          };

          const errorHandler = (error: Error) => {
            reject(error);
            worker.removeListener('message', messageHandler);
          };

          worker.once('message', messageHandler);
          worker.once('error', errorHandler);
        });
    }





}

