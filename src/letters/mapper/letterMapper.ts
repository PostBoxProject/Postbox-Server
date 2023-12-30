import { LetterResponse } from "../dto/letterResponse";
import { Letter } from "../letter.entity";

export class LetterMapper{
    static toDto(letter: Letter): LetterResponse {
        const letterDto = new LetterResponse();
        letterDto.id = letter.id;
        letterDto.description = letter.description;
        letterDto.postbox = letter.postbox;
        letterDto.read = letter.reed;

        return letterDto;
    }
}


