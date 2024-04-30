import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'src/postboxs/jwt.strategy'; 

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(
    @Inject('LoggerWinston') private readonly logger: any,
    private readonly jwt: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers } = req;
    const userAgent = req.get('user-agent');
    const payload = headers.authorization
      ? <JwtPayload>this.jwt.decode(headers.authorization)
      : null;
    const userId = payload ? payload.postBoxId : 0;
    const datetime = new Date();
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${datetime} USER-${userId} ${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
      );
    });

    next();
  }
}