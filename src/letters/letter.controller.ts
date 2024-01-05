import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateLetterRequest } from "./dto/letterRequest";
import { LetterResponse } from "./dto/letterResponse";
import { Letter } from "./letter.entity";
import { LetterService } from "./letter.service";

@ApiTags('letters')
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

    //쓸일 없을거 같기도
    @Get()
    getAllLetter(): Promise<LetterResponse[]>{
        return this.letterService.getAllLetters();
    }

    @Get('postbox/:postboxid')
    getAllMyLetter(@Param('postboxId') postboxId: number): Promise<LetterResponse[]>{
        return this.letterService.getAllLetters();
    }

    @Delete('/:id')
    deleteLetter(@Param('id') id: number): Promise<void>{
        return this.letterService.deleteLetter(id);
    }




}