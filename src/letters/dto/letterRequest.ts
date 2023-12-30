import { IsNotEmpty } from "class-validator";

export class CreateLetterRequest{

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    postboxId: number;
}