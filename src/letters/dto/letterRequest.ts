import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateLetterRequest{

    @ApiProperty({default: "string"})
    @IsNotEmpty()
    description: string;

    @ApiProperty({default: 1})
    @IsNotEmpty()
    postboxId: number;
}