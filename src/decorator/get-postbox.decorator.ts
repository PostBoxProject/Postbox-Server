import { createParamDecorator, ExecutionContext} from "@nestjs/common";
import { PostBox } from "src/postboxs/postbox.entity";

export const GetPostBoxName = createParamDecorator((data, ctx: ExecutionContext): PostBox =>{
    const req = ctx.switchToHttp().getRequest();
    return req.name;
})