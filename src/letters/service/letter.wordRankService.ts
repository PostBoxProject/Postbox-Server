import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEmitter } from "stream";
import { Repository } from "typeorm";
import { LetterWordRankDto } from "../dto/letterWordRankDto";
import { Letter } from "../letter.entity";

import { Worker } from 'worker_threads';
import * as path from 'path';

@Injectable()
export class WordRankService{

    constructor(
        @InjectRepository(Letter)
        private letterRepository: Repository<Letter>,        
    ){}

    private poolCount: number = 0;
    private readonly readyPool: Worker[] = [];
    private readonly workingPool: Set<Worker> = new Set();
    private readonly isReady: EventEmitter = new EventEmitter();
    
    private readonly workerPath = path.join(__dirname,'/..', 'workers', 'letterWordRanker.js')


    async generateWordRankByPostBoxWorker(postBoxId: number): Promise<LetterWordRankDto[]>{           

        const letters = await this.letterRepository.find({
             where: { postbox: { id: postBoxId } } 
        });
        
        const worker = await this.getWorker();
        const result = await this.assignWorker(worker, letters);        

        return result;
                
    }

    private getWorker(): Promise<Worker> {
        return new Promise((resolve) => {
            //사용가능한 워커 있음
            if (this.readyPool.length > 0) {
                return resolve(this.popWorker());
            }    
            // 사용가능한 리스너 생길때까지 기다림
            this.isReady.once('next', () => resolve(this.popWorker()));

            //현대 생성된 스레드수 10보다 작으면 create
            if (this.poolCount < 3) {
                this.createWorker();
            }
        });
    }

    private popWorker() {
        const worker = this.readyPool.pop()!;
        this.workingPool.add(worker);
        return worker;
    }


    private createWorker() {
        const worker = new Worker(this.workerPath);
        worker.once('exit', (code) => {
          if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
        });
    
        this.readyPool.push(worker);
        this.poolCount += 1;
        this.isReady.emit('next');
    }


    private async assignWorker(worker: Worker, letters: Letter[]): Promise<LetterWordRankDto[]> {
        worker.postMessage(letters);
    
        return new Promise((resolve, reject) => {
            const next = () => {
                this.readyPool.push(worker);
                this.workingPool.delete(worker);
                this.isReady.emit('next');
            }
            const messageHandler = (result: LetterWordRankDto[]) => {
                resolve(result);
                worker.removeListener('error', errorHandler);
                next();
            };
            const errorHandler = (error: Error) => {
                reject(error);
                worker.removeListener('message', messageHandler);
                next();
            }
            worker.once('message', messageHandler);
            worker.once('error', errorHandler);
        });
    }

}