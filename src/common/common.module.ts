import { Global, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerContextMiddleware } from 'src/middleware/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { winstonLogger } from 'src/config/logger.config';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [LoggerContextMiddleware,{provide: 'LoggerWinston', useValue: winstonLogger}],
  exports: [LoggerContextMiddleware],
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}