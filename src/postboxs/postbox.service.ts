import { Injectable } from "@nestjs/common";
import { PostBox } from "./postbox.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { PostboxRequest } from "./dto/postboxRequest";

@Injectable()
export class PostBoxService{

    constructor(
        @InjectRepository(PostBox)
        private postboxRepository: Repository<PostBox>
    ){}
    
    async createPostbox(dto: PostboxRequest): Promise<PostBox>{
        const {name, email, password} = dto;

        const postbox = this.postboxRepository.create({
            name,
            email,
            password
        })
        await this.postboxRepository.save(postbox);
        return postbox
    }

}