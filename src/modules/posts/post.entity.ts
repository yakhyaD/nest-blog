import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500})
    title: string;

    @Column('text')
    body: string;

    @ManyToOne(() => User, user => user.posts, {onDelete: "SET NULL"})
    user: User;
}
