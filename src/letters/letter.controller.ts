import { Body, Controller, Post } from "@nestjs/common";
import { CreateLetterRequest } from "./dto/letterRequest";
import { LetterResponse } from "./dto/letterResponse";
import { Letter } from "./letter.entity";
import { LetterService } from "./letter.service";

@Controller()
export class LetterController{

    constructor(private letterService: LetterService){}

    @Post()
    createLetter(@Body() dto: CreateLetterRequest): Promise<LetterResponse> {
        return this.letterService.createLetter(dto);
    }

    
}