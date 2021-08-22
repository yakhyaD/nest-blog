import { AuthController } from './modules/auth/auth.contoller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './core/database/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthMiddleware } from './common/auth.middleware';
import { PostsController } from './modules/posts/posts.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({...DatabaseConfig, autoLoadEntities: true}),
    AuthModule,
    UsersModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(PostsController, AuthController)
  }
}
