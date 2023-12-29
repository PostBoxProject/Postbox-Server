import { IsNotEmpty } from "class-validator";

export class PostboxResponse{

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;
}