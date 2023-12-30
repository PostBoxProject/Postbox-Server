import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostBox } from "src/postboxs/postbox.entity";
import { PostBoxService } from "src/postboxs/postbox.service";
import { Repository } from "typeorm";
import { CreateLetterRequest } from "./dto/letterRequest";
import { LetterResponse } from "./dto/letterResponse";
import { Letter } from "./letter.entity";
import { LetterMapper } from "./mapper/letterMapper";

@Injectable()
export class LetterService{

    constructor(
        @InjectRepository(Letter)
        private letterRepository: Repository<Letter>,
        private postboxService: PostBoxService,
    ){}

    async createLetter(dto: CreateLetterRequest): Promise<LetterResponse>{
        const {description, postboxId} = dto;

        const postbox = await this.postboxService.getPostbox(postboxId);

        const letter = await this.letterRepository.create({
            description,
            postbox,
            reed: false
        })
        await this.letterRepository.save(postbox);
        return LetterMapper.toDto(letter);
    }

}