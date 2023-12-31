import { Module } from '@nestjs/common';
import { PostBox } from './postbox.entity';
import { PostBoxService } from './postbox.service';
import { PostBoxCotroller } from './postboxs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostBox])
      ],
    controllers: [PostBoxCotroller],
    providers: [PostBoxService],
    exports: [PostBoxService],
})
export class PostboxsModule {}
