import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateLetterRequest } from "./dto/letterRequest";
import { LetterResponse } from "./dto/letterResponse";
import { Letter } from "./letter.entity";
import { LetterService } from "./letter.service";

@Controller('letters')
export class LetterController{

    constructor(private letterService: LetterService){}

    @Post()
    createLetter(@Body() dto: CreateLetterRequest): Promise<LetterResponse> {
        return this.letterService.createLetter(dto);
    }

    @Get('/:id')
    getLetterById(@Param('id') id: number) : Promise<LetterResponse>{
        return this.letterService.getLetterById(id);
    }

    @Get()
    getAllLetter(): Promise<LetterResponse[]>{
        return this.letterService.getAllLetters();
    }

    @Get()
    getAllMyLetter(@Param('postboxId') postboxId: number): Promise<LetterResponse[]>{
        return this.letterService.getAllLetters();
    }

    @Delete('/:id')
    deleteLetter(@Param('id') id): Promise<void>{
        return this.letterService.deleteLetter(id);
    }




}