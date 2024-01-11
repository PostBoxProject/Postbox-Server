import { createParamDecorator, ExecutionContext, } from "@nestjs/common";
import { PostBox } from "src/postboxs/postbox.entity";

export const GetPostBoxId = createParamDecorator((data, ctx: ExecutionContext): PostBox =>{
    
    const req = ctx.switchToHttp().getRequest();
    
    //console.log('req', req.user.id)
    
    return req.user.id;
})