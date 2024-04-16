import { Body, Controller, Delete, Get, Param, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetPostBoxId } from "src/decorator/get-postbox.decorator";
import { Roles } from "src/decorator/role.decorator";
import { CreateLetterRequest } from "./dto/letterRequest";
import { LetterResponse } from "./dto/letterResponse";
import { LetterWordRankDto } from "./dto/letterWordRankDto";
import { MyAccessGuard } from "./guard/MyAccessGuard";
import { Letter } from "./letter.entity";
import { LetterService } from "./letter.service";


@ApiTags('letters')
@Controller('letters')
export class LetterController{

    constructor(private letterService: LetterService){}

    @Post()
    // @SetMetadata('roles',['admin'])
    @Roles('admin')
    @ApiOperation({summary: 'letter 생성', description: '.'})
    createLetter(@Body() dto: CreateLetterRequest): Promise<LetterResponse> {
        return this.letterService.createLetter(dto);
    }


    @Get('/postbox/:id')
    @ApiOperation({summary: '현재 사용자가 받은 letter 조회', description: '.'})
    @UseGuards(AuthGuard(), MyAccessGuard)     
    getAllMyLetter(@Param('id') postboxId: number): Promise<LetterResponse[]>{           
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


    
    //편지 단어 통계
    @Get('rank/:postBoxId')
    @ApiOperation({summary: 'letter들 포함된 단어 통계', description: '.'})
    findLetterByKeyword(@Param('postBoxId') postBoxId: number): Promise<LetterWordRankDto[]>{    
        return this.letterService.generateWordRankByPostBox(postBoxId);        
    }
    


}