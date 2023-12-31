import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PostboxRequest } from "./dto/postboxRequest";
import { PostboxResponse } from "./dto/postboxResponse";
import { PostBoxService } from "./postbox.service";

@Controller('postboxs')
export class PostBoxCotroller{

    constructor(private postboxService: PostBoxService){}

    @Post()
    createPostBox_temp(@Body() dto: PostboxRequest): Promise<PostboxResponse>{
        return this.postboxService.createPostbox(dto);
    }

    @Get()
    findAllPostBox(): Promise<PostboxResponse[]>{
        return this.postboxService.getAllPostbox()
    }

    @Get('/:keyword')
    findPostBoxByName(@Param('keyword') keyword: string): Promise<PostboxResponse[]>{
        return this.postboxService.getPostBoxByname(keyword);
    }
    
}