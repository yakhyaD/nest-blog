import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await this.usersService.findOneById(payload.id);

    if (!user) {
      throw new UnauthorizedException('You are not authorized to perform the operation');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...rest} = user;
    return {...rest, payload}
  }
}

