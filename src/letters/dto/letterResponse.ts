import { IsNotEmpty } from "class-validator";
import { PostBox } from "src/postboxs/postbox.entity";

export class LetterResponse{
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    read: boolean;
    
    @IsNotEmpty()
    postbox: PostBox;
}