import { Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
    createPostBox_temp(@Body() dto: PostboxRequest): Promise<PostboxResponse>{
        return this.postboxService.createPostbox(dto);
    }

    @Post('/signin')
    sigIn(@Body() authRequest: AuthRequest){
        return this.postboxService.singIn(authRequest);
    }

    @Get()
    findAllPostBox(@Query() page: PageRequest): Promise<PaginatedPostboxResponse>{
        return this.postboxService.getAllPostbox(page);
    }

    @Get('/:keyword')
    findPostBoxByName(@Param('keyword') keyword: string): Promise<PostboxResponse[]>{
        return this.postboxService.getPostBoxByname(keyword);
    }
    
}