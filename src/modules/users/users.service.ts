import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

    create(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }

    async findOneById(id: number): Promise<User> {
        const user =  await this.userRepository.findOne(id);
        if(!user){
            throw new NotFoundException("User not found")
        }
        return user;
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({email: email});
        if(!user){
            throw new NotFoundException("User not found")
        }
        return user;
    }
}
