import { Module } from '@nestjs/common';
import { PostBox } from './postbox.entity';
import { PostBoxService } from './postbox.service';
import { PostBoxCotroller } from './postboxs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
        secret: 'postbox123',
        signOptions:{
          expiresIn: 60*60,
        }
      }),
        TypeOrmModule.forFeature([PostBox])
      ],
    controllers: [PostBoxCotroller],
    providers: [PostBoxService, JwtStrategy],
    exports: [PostBoxService],
})
export class PostboxsModule {}
