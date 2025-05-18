import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column()
    createdAt: Date;

    constructor(
        email: string,
        name: string,
        password: string,
        role?: UserRole
    ) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role ?? UserRole.USER;
        this.createdAt = new Date();
    }
}
