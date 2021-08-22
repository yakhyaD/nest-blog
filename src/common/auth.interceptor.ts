import { Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    intercept(context, next): Observable<any> {

        const { headers, res } = context.args[0];

        const mytoken = headers.authorization ? headers.authorization.trim().split(" ")[1] : null;

        if (mytoken) {
            jwt.verify(mytoken ,process.env.SECRET_TOKEN, (err) => {
                if (err) {
                    return res.redirect('/auth/login');
                }
                return next();
            });
        }
        return res.redirect('/auth/login');
    }
}
