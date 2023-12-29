import { Body, Controller, Post } from "@nestjs/common";
import { PostboxRequest } from "./dto/postboxRequest";
import { PostBox } from "./postbox.entity";
import { PostBoxService } from "./postbox.service";

@Controller('postboxs')
export class PostBoxCotroller{

    constructor(private postboxService: PostBoxService){}

    @Post()
    createPostBox_temp(
        @Body() dto: PostboxRequest): Promise<PostBox>{
            return this.postboxService.createPostbox(dto);
        }
}