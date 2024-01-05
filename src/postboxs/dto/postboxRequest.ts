import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PostboxRequest{

    @ApiProperty({default: "string"})
    @IsNotEmpty()
    name: string;

    @ApiProperty({default: "string"})
    @IsNotEmpty()
    email: string;

    @ApiProperty({default: "string"})
    @IsNotEmpty()
    password: string;
}