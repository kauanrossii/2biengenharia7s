import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Repository } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOneByOrFail({ id });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneByOrFail({ email });
    }

    async create(user: User) {
        const duplicatedUser = await this.userRepository.existsBy([
            { email: user.email },
            { name: user.name }
        ]);

        if (duplicatedUser)
            throw new ConflictException(
                'There is already an user with same email or name'
            );

        await hash(user.password, 10);

        return this.userRepository.save(user);
    }
}
