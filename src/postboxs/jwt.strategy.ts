import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PostboxResponse } from "./dto/postboxResponse";
import { PostBox } from "./postbox.entity";
import { PostBoxService } from "./postbox.service";

export class JwtPayload {
    postBoxId: number;
    
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private postboxService: PostBoxService){
        super({
            secretOrKey: 'postbox123',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload){
        const { postBoxId } = payload;
        console.log('id',postBoxId)
        if (!postBoxId){
            throw new UnauthorizedException('payload 없음');
        }
        const postbox: PostboxResponse = await this.postboxService.getPostbox(postBoxId)

        if(!postbox){
            throw new UnauthorizedException();
        }
        return postbox;
    }
}