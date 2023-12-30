import { Injectable } from "@nestjs/common";
import { PostBox } from "./postbox.entity";
import { Like, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { PostboxRequest } from "./dto/postboxRequest";
import { PostBoxMapper } from './mapper/postboxMapper';
import { PostboxResponse } from "./dto/postboxResponse";

@Injectable()
export class PostBoxService{

    constructor(
        @InjectRepository(PostBox)
        private postboxRepository: Repository<PostBox>
    ){}
    
    //생성
    async createPostbox(dto: PostboxRequest): Promise<PostboxResponse>{
        const {name, email, password} = dto;

        const postbox = this.postboxRepository.create({
            name,
            email,
            password
        })
        await this.postboxRepository.save(postbox);
        return PostBoxMapper.toDto(postbox);
    }

    //전체 검색
    async getAllPostbox(): Promise<PostboxResponse[]>{
        const postboxes = await this.postboxRepository.find();
        const responseDtoArray = postboxes.map(postbox => PostBoxMapper.toDto(postbox));

        return responseDtoArray;
    }

    //id 검색
    async getPostbox(id: number): Promise<PostboxResponse>{
        const postbox = await this.postboxRepository.findOneBy({id});
        
        return PostBoxMapper.toDto(postbox);
    }

    //키워드 검색
    async getPostBoxByname(keyword: string): Promise<PostboxResponse[]>{
        const postboxes = await this.postboxRepository.find({
            where: {
                name: Like(`%${keyword}%`),
            },
        });
        const responseDtoArray = postboxes.map(postbox => PostBoxMapper.toDto(postbox));
        return responseDtoArray;
    }

}