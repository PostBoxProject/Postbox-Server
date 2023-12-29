import { IsNotEmpty } from "class-validator";

export class PostboxRequest{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}