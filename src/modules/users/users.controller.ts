import { UsersService } from 'src/modules/users/users.service';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller("user")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    profile(@Request() req) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {payload, ...profile} = req.user
        return profile;
    }
}
