import { IsNotEmpty, MinLength } from "class-validator";
import { User } from "src/modules/users/user.entity";

export class CreatePostDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

    @IsNotEmpty()
    readonly body: string;

    user?: User
}
