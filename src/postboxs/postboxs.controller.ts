import { Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthRequest } from "./dto/authRequest";
import { PageRequest } from "./dto/pageRequest";
import { PostboxRequest } from "./dto/postboxRequest";
import { PaginatedPostboxResponse, PostboxResponse } from "./dto/postboxResponse";
import { PostBoxService } from "./postbox.service";

@ApiTags('postboxs')
@Controller('postboxs')
export class PostBoxCotroller{

    constructor(private postboxService: PostBoxService){}

    @Post()
    @ApiOperation({summary: 'postbox 생성', description: '.'})
    createPostBox_temp(@Body() dto: PostboxRequest): Promise<PostboxResponse>{
        return this.postboxService.createPostbox(dto);
    }

    @Post('/signin')
    @ApiOperation({summary: 'postbox 로그인', description: '.'})
    sigIn(@Body() authRequest: AuthRequest){
        return this.postboxService.singIn(authRequest);
    }

    @Get()
    @ApiOperation({summary: '전체 postBox 검색', description: '.'})
    findAllPostBox(@Query() page: PageRequest): Promise<PaginatedPostboxResponse>{
        return this.postboxService.getAllPostbox(page);
    }

    @Get('/:keyword')
    @ApiOperation({summary: 'postBox 키워드로 검색', description: '.'})
    findPostBoxByName(@Query() page: PageRequest, @Param('keyword') keyword: string): Promise<PaginatedPostboxResponse>{
        return this.postboxService.getPostBoxByname(page, keyword);
    }
    
}