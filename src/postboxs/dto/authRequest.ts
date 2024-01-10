import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthRequest{

    @ApiProperty({default: "string"})
    @IsString()
    postboxName: string;

    @ApiProperty({default: "string"})
    @IsString()
    password: string;
}