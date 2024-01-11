import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PostBox } from "./postbox.entity";
import { Like, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { PostboxRequest } from "./dto/postboxRequest";
import { PostBoxMapper } from './mapper/postboxMapper';
import { PaginatedPostboxResponse, PostboxResponse } from "./dto/postboxResponse";
import { PageRequest } from "./dto/pageRequest";
import { skip } from "node:test";
import * as bcrypt from 'bcryptjs';
import { AuthRequest } from "./dto/authRequest";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PostBoxService{

    constructor(
        @InjectRepository(PostBox)
        private postboxRepository: Repository<PostBox>,
        private jwtService: JwtService
    ){}

    
    //생성
    async createPostbox(dto: PostboxRequest): Promise<PostboxResponse>{
        const {name, email, password} = dto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const postbox = this.postboxRepository.create({
            name,
            email,
            password: hashedPassword
        })
        await this.postboxRepository.save(postbox);
        return PostBoxMapper.toDto(postbox);
    }


    //postbox 접속 (로그인)
    async singIn(authRequest: AuthRequest): Promise<{accessToken: string}>{
        const {postboxName, password} = authRequest;
        
        const postBox = await this.postboxRepository.findOneBy({name:postboxName})        

        if(postBox && (await bcrypt.compare(password, postBox.password))){
            const payload = { postBox }
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else{
            throw new UnauthorizedException('login fail');
        }
    }


    //전체 검색
    async getAllPostbox(page: PageRequest): Promise<PaginatedPostboxResponse>{
        console.log(page);
        
        const totalCount = await this.postboxRepository.count();
        
        const pageNo = page.pageNo;
        const pageSize = page.pageSize;
        const postboxes = await this.postboxRepository.find({
            take: pageSize,
            skip: pageNo,
        });   
        const totalpages = totalCount / pageSize;   

        const responseDtoArray = postboxes.map(postbox => PostBoxMapper.toDto(postbox));
        // const totalPages = Math.ceil(totalCount / page.getLimit());

        return new PaginatedPostboxResponse(responseDtoArray, totalCount, totalpages, pageNo);
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