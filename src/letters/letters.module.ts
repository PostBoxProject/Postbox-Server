import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GetPostBoxId } from 'src/decorator/get-postbox.decorator';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { PostBoxService } from 'src/postboxs/postbox.service';
import { PostboxsModule } from 'src/postboxs/postboxs.module';
import { MyAccessGuard } from './guard/MyAccessGuard';
import { LetterController } from './letter.controller';
import { Letter } from './letter.entity';
import { LetterService } from './service/letter.service';
import { WordRankService } from './service/letter.wordRankService';


@Module({
    imports: [
        TypeOrmModule.forFeature([Letter]),
        PostboxsModule,      
      ],
    controllers: [LetterController],
    providers: [
      LetterService, WordRankService, MyAccessGuard, JwtService,
      LoggingInterceptor
    
    ]
})
export class LettersModule {}
