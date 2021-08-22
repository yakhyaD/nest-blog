import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Module } from '@nestjs/common';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Post]), UsersModule],
    providers: [PostsService],
    controllers: [PostsController],
    exports: [PostsService],
})
export class PostsModule {}
