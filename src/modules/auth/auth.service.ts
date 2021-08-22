import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            throw new Error("Incorrect Password");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        return  await bcrypt.compare(enteredPassword, dbPassword);

    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }

    async signup(user: CreateUserDto) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        //create user
        const newUser = await this.usersService.create({...user, password: hashedPassword});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = newUser

        //generate token
        const token = await this.jwtService.sign(result);

        return {user: result, token: token}
    }
}
