import { isMainThread, parentPort, workerData } from 'worker_threads';
import { LetterWordRankDto } from '../dto/letterWordRankDto';
import { Letter } from '../letter.entity';


if (isMainThread) {
    throw new Error('This file should be run as a worker thread');
  }
  
if (parentPort === null) {
    throw new Error('parentPort is null');
}
  
parentPort.on('message', (letters: Letter[]) => {
    parentPort!.postMessage(ranker(letters));
});

function ranker(letters: Letter[]) {

    const wordMap = new Map<string, number>();
    const wordRankList: LetterWordRankDto[] = [];

    letters.forEach((letter) => {
        const words = letter.description.toLowerCase().match(/\b\w+\b/g);
        if (words) {
            words.forEach((word) => {                
            wordMap.set(word, (wordMap.get(word) || 0) + 1);
            });
        }
    });

    wordMap.forEach((count,word) =>{
        const dto: LetterWordRankDto = {
            word: word,
            count: count
        };
        wordRankList.push(dto);
    });
    
    return wordRankList;
}



// letters.forEach((letter) => {
        //     const words = letter.description.toLowerCase().match(/\b\w+\b/g);
            
        //     if (words) {
        //       words.forEach((word) => {                
        //         wordMap.set(word, (wordMap.get(word) || 0) + 1);
        //       });
        //     }
        // });             

        // wordMap.forEach((count,word) =>{
        //     const dto: LetterWordRankDto = {
        //         word: word,
        //         count: count
        //     };
        //     wordRankList.push(dto);
        // });
        //return wordRankList;