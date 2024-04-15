import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

export class RolesGuard implements CanActivate{

    constructor(private reflector: Reflector, private jwtService: JwtService){}
    

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];  
        if(!token){
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }    

        const decodedToken = this.jwtService.decode(token) as {role: string};
        const postboxRole = decodedToken.role;         

        //가드에 들어온 메서드의 메타데이터
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        //멘타데이터 역할과 현재 사용자 역할 일치할때만 ture 리턴
        return roles?.includes(postboxRole) ?? true;
    }
}