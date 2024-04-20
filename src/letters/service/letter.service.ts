import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { count } from "console";
import { PostBox } from "src/postboxs/postbox.entity";
import { PostBoxService } from "src/postboxs/postbox.service";
import { Repository } from "typeorm";
import { CreateLetterRequest } from "../dto/letterRequest";
import { LetterResponse } from "../dto/letterResponse";
import { LetterWordRankDto } from "../dto/letterWordRankDto";
import { Letter } from "../letter.entity";
import { LetterMapper } from "../mapper/letterMapper";

@Injectable()
export class LetterService{

    constructor(
        @InjectRepository(Letter)
        private letterRepository: Repository<Letter>,
        private postboxService: PostBoxService,
    ){}

    //letter 생성
    async createLetter(dto: CreateLetterRequest): Promise<LetterResponse>{
        const {description, postboxId} = dto;
        
        const postbox = await this.postboxService.getPostbox(postboxId);

        const letter = await this.letterRepository.create({
            description,
            postbox,
            reed: false
        })
        await this.letterRepository.save(letter);
        return LetterMapper.toDto(letter);
    }

    //id로 letter 검색
    async getLetterById(id: number): Promise<LetterResponse>{
        const found = await this.letterRepository.findOneBy({id});        
        if(!found){
            throw new NotFoundException('찾는 아이디가 없습니다.');
        }
        found.reed = true;
        await this.letterRepository.save(found);
        return LetterMapper.toDto(found);
    }

    //전체 letter 검색
    async getAllLetters(): Promise<LetterResponse[]>{
        const letters = await this.letterRepository.find();
        const responseDtoArray = letters.map(letter => LetterMapper.toDto(letter))
        return responseDtoArray;
    }


    //내 letter 검색 
    async getMyLetters(postboxId: number): Promise<LetterResponse[]>{
        //console.log('poId',postboxId);
        const letters = await this.letterRepository.find({
            where: { postbox: { id: postboxId } },  
        });
        
        const responseDtoArray = letters.map(letter => LetterMapper.toDto(letter));
        return responseDtoArray;
    }

    //letter 삭제
    async deleteLetter(id: number): Promise<void>{
        const result = await this.letterRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException("can't such delete id");
        }
    }


    
    async generateWordRankByPostBox(postBoxId: number): Promise<LetterWordRankDto[]>{
       
        const wordMap = new Map<string, number>();
        const wordRankList: LetterWordRankDto[] = [];

        const letters = await this.letterRepository.find({
             where: { postbox: { id: postBoxId } } 
        });
        
        // console.time('rankword method time');

        letters.forEach((letter) => {
            const words = letter.description.toLowerCase().match(/\b\w+\b/g);
            
            if (words) {
              words.forEach((word) => {                
                wordMap.set(word, (wordMap.get(word) || 0) + 1);
              });
            }
        });             

        wordMap.forEach((count,word) =>{
            const dto: LetterWordRankDto = {
                word: word,
                count: count
            };
            wordRankList.push(dto);
        });

        // console.timeEnd('rankword method time');

        return wordRankList;
    }

    

}