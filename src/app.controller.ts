import { Controller, Get, Response, UseInterceptors } from '@nestjs/common';
import { AuthInterceptor } from './common/auth.interceptor';

@UseInterceptors(AuthInterceptor)
@Controller()
export class AppController {

  @Get()
  home(@Response() res) {
    return res.redirect('/posts');
  }
}
