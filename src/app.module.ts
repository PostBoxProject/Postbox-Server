import { Module } from '@nestjs/common';
import { PostboxsModule } from './postboxs/postboxs.module';
import { LettersModule } from './letters/letters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';





@Module({
  imports: [    
    TypeOrmModule.forRoot(typeORMConfig),    
    CommonModule, PostboxsModule, LettersModule],  
})
export class AppModule {}
