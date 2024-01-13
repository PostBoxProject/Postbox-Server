import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetPostBoxId } from "src/decorator/get-postbox.decorator";
import { CreateLetterRequest } from "./dto/letterRequest";
import { LetterResponse } from "./dto/letterResponse";
import { Letter } from "./letter.entity";
import { LetterService } from "./letter.service";


@ApiTags('letters')
@Controller('letters')
export class LetterController{

    constructor(private letterService: LetterService){}

    @Post()
    @ApiOperation({summary: 'letter 생성', description: '.'})
    createLetter(@Body() dto: CreateLetterRequest): Promise<LetterResponse> {
        return this.letterService.createLetter(dto);
    }


    @Get('/postbox')
    @ApiOperation({summary: '현재 사용자가 받은 letter 조회', description: '.'})
    @UseGuards(AuthGuard())     
    getAllMyLetter(@GetPostBoxId() postboxId: number): Promise<LetterResponse[]>{           
        return this.letterService.getMyLetters(postboxId);
    }


    @Get('/:id')
    @ApiOperation({summary: 'letter id로 letter 조회', description: '.'})
    getLetterById(@Param('id') id: number) : Promise<LetterResponse>{
        return this.letterService.getLetterById(id);
    }

    //쓸일 없을거 같기도
    @Get()
    getAllLetter(): Promise<LetterResponse[]>{
        return this.letterService.getAllLetters();
    }

    

    @Delete('/:id')
    @ApiOperation({summary: 'letter id로 letter 삭제', description: '.'})
    deleteLetter(@Param('id') id: number): Promise<void>{
        return this.letterService.deleteLetter(id);
    }




}