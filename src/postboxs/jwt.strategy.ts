import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PostboxResponse } from "./dto/postboxResponse";
import { PostBox } from "./postbox.entity";
import { PostBoxService } from "./postbox.service";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private postboxService: PostBoxService){
        super({
            secretOrKey: 'postbox123',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        const { id } = payload;
        const postbox: PostboxResponse = await this.postboxService.getPostbox(id)

        if(!postbox){
            throw new UnauthorizedException();
        }
        return postbox;
    }
}