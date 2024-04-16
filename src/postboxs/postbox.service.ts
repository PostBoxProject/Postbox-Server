import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
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

//worker
import { Worker } from 'worker_threads';
import * as path from 'path';

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

        //중복검사 (아무리봐도 repository 있는게 좋은거 같은데...)
        try{
            await this.postboxRepository.save(postbox);
            return PostBoxMapper.toDto(postbox);            
        }catch(error){
            console.log('error',error.code);
            if(error.code === 'ER_DUP_ENTRY'){
                throw new ConflictException('이미 존재하는 이름 입니다.');
            }
            else{
                throw new ConflictException('internal error')
            }
        }         
    }


    //postbox 접속 (로그인)
    async singIn(authRequest: AuthRequest): Promise<{accessToken: string, postBoxId: number}>{
        const {postboxName, password} = authRequest;
        
        const postBox = await this.postboxRepository.findOneBy({name:postboxName})  
        const postBoxId = postBox.id      

        if(postBox && (await bcrypt.compare(password, postBox.password))){
            const payload = { postBoxId }
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken, postBoxId: postBox.id};
        } else{
            throw new UnauthorizedException('login fail');
        }
    }


    //전체 검색
    async getAllPostbox(page: PageRequest): Promise<PaginatedPostboxResponse>{        
        
        console.log("getAll");

        //worker
        const workerData = { data: 'hello_worker' }
        const worker = new Worker(path.join(__dirname,'workers','worker.js'),{workerData});

        worker.on('message', (result) => {
            console.log('worker result', result);
        });
        

        
        const totalCount = await this.postboxRepository.count();
        
        const pageNo = page.pageNo;
        const pageSize = page.pageSize;
        const postboxes = await this.postboxRepository.find({
            take: pageSize,
            skip: (pageNo - 1) * pageSize,
        });   
        const totalpages = Math.ceil(totalCount / pageSize);   

        const responseDtoArray = postboxes.map(postbox => PostBoxMapper.toDto(postbox));
        // const totalPages = Math.ceil(totalCount / page.getLimit());

        return new PaginatedPostboxResponse(responseDtoArray, totalCount, totalpages, pageNo);
    }



    //키워드 검색
    async getPostBoxByname(page: PageRequest, keyword: string): Promise<PaginatedPostboxResponse>{
        const pageNo = page.pageNo;
        const pageSize = page.pageSize;
        const totalCount = await this.postboxRepository.count();

        const postboxes = await this.postboxRepository.find({
            where: {
                name: Like(`%${keyword}%`),
            },
            take: pageSize,
            skip: (pageNo-1) * pageSize,
        });
        const totalPages = Math.ceil(totalCount / pageSize);
        
        const responseDtoArray = postboxes.map(postbox => PostBoxMapper.toDto(postbox));
        return new PaginatedPostboxResponse(responseDtoArray, totalCount, totalPages, pageNo);
    }


    //id 검색
    async getPostbox(id: number): Promise<PostboxResponse>{
        const postbox = await this.postboxRepository.findOneBy({id});
        
        return PostBoxMapper.toDto(postbox);
    }


    

}