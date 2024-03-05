import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class MyAccessGuard implements CanActivate{
    
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try{

            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(' ')[1];       
        
            //console.log("request",request) 
            console.log("id 찾기",request.headers.referer)

            if(!token){
                throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
            }
        
            const decodedToken = this.jwtService.decode(token) as {postBoxId: string};
            const cuttentPostBoxId = decodedToken.postBoxId;   
            console.log("토큰 담긴 id", cuttentPostBoxId)   

            let postBoxIdFromRequest = 0
            const matches = request.headers.referer.match(/\/letterlist\/(\d+)/);
            if (matches && matches.length > 1){
                postBoxIdFromRequest = parseInt(matches[1]);
            }
            console.log("url 담긴 id", postBoxIdFromRequest)      
            
            console.log("왜 다를까",cuttentPostBoxId.toString().length, postBoxIdFromRequest.toString().length)   

            if (cuttentPostBoxId.toString() === postBoxIdFromRequest.toString()){
                console.log("guard 통과")
                
                return true;
            }
            throw new HttpException('Access denied', HttpStatus.FORBIDDEN);

        }catch (error) {            
            console.error("Guard Error:", error.response);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        

    }
}