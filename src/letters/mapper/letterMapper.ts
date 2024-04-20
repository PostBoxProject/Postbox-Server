import { LetterResponse } from "../dto/letterResponse";
import { Letter } from "../letter.entity";
import { LetterWordRankDto } from "../dto/letterWordRankDto"; 

export class LetterMapper{

    static toDto(letter: Letter): LetterResponse {
        const letterDto = new LetterResponse();        

        letterDto.id = letter.id;
        letterDto.description = letter.description;    
        if (letter.postbox) {
            letterDto.postboxId = letter.postbox.id;
            letterDto.postboxName = letter.postbox.name;
        } 
        letterDto.read = letter.reed;


        return letterDto;
    }

    static toWordRankDto(word: string, count: number): LetterWordRankDto {
        const wordRankDto = new LetterWordRankDto();
        
        wordRankDto.word = word;
        wordRankDto.count = count;

        return wordRankDto;
    }
}


