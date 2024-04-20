import { Process, Processor } from "@nestjs/bull";
import { Job } from 'bull';
import { LetterWordRankDto } from "../dto/letterWordRankDto";
import { Letter } from "../letter.entity";

@Processor('wordRankQueue')
export class RankWordProcessor{        

    @Process({ name: 'rankJob', concurrency: 5 })    
    async transcode(job: Job<Letter[]>): Promise<LetterWordRankDto[]> {        

        const letters = job.data;
        const wordRankList: LetterWordRankDto[] = [];
        const wordMap = new Map<string, number>();
        

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
        await job.progress(100);
        return wordRankList;        
    }    
}