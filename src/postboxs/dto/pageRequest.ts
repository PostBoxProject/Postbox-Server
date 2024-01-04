// src/postbox/dto/PageRequest.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';


export class PageRequest {

    @ApiProperty({ example: 1, description: '페이지 번호' })        
    @IsOptional()
    pageNo?: number;

    @ApiProperty({ example: 10, description: '페이지 크기' })    
    @IsOptional()
    pageSize?: number;
    

    getOffset(): number {
        console.log(this.pageNo);
        if (this.pageNo < 1 || this.pageNo === null || this.pageNo === undefined) {
            this.pageNo = 1;
        }

        if (
            this.pageSize < 1 ||
            this.pageSize === null ||
            this.pageSize === undefined
        ){
            this.pageSize = 10;
        }

        return (Number(this.pageNo) - 1) * Number(this.pageSize);
    }

    getLimit(): number {
        if (
            this.pageSize < 1 ||
            this.pageSize === null ||
            this.pageSize === undefined
        ) {
            this.pageSize = 10;
        }
        return Number(this.pageSize);
    }
}
