import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers?.cookie && req.headers.cookie.split('=')[1]) {
            const token = req.headers.cookie.split('=')[1]
            req.headers.authorization = `Bearer ${token}`;
        }

        // const token = req.cookies['jwt']
        // if (token) {
        //     req.headers['Authorization'] = token
        // }
        return next();
    }
}
