import { Controller, Post, UseGuards, Request, Body, Response, Get, Render } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UniqueUser } from "./guards/unique-user.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService  ) {}

    @Get('login')
    @Render('login')
    loginPage() {
        return {}
    }

    @Get('signup')
    @Render('signup')
    signupPage() {
        return {}
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response() res) {
        const { access_token } = await this.authService.login(req.user);
        res.cookie("jwt", access_token, { httpOnly: true, sameSite: true });
        res.redirect('/posts')
    }

    @UseGuards(UniqueUser)
    @Post('signup')
    async register(@Body() user: CreateUserDto) {
        return await this.authService.signup(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Response() res){
        res.clearCookie("jwt");
        res.redirect('/auth/login')
    }
}
