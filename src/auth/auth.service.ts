import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from 'src/user/entities/user';

@Injectable()
export class AuthService {
    constructor(@Inject() private readonly userService: UserService) {}

    async signin(email: string, password: string): Promise<string> {
        const existsUser = await this.userService.findByEmail(email);

        if (!existsUser) {
            throw new UnauthorizedException('The user credentials are wrong');
        }

        if (!(await compare(password, existsUser.password))) {
            throw new UnauthorizedException('The user credentials are wrong');
        }

        return sign(
            { id: existsUser.id },
            'a09e7a37-e4e4-4089-ac53-1aecee49d237',
            {
                expiresIn: '2h'
            }
        );
    }

    async signup(user: User): Promise<User> {
        user.password = await hash(user.password, 10);
        return await this.userService.create(user);
    }
}
