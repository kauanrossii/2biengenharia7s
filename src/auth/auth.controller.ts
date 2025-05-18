import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Post
} from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/singup.dto';
import { User } from 'src/user/entities/user';
import { AuthService } from './auth.service';
import { SigninResponseDto } from './dtos/signin-response.dto';

@Controller({ path: '/auth' })
export class AuthController {
    constructor(@Inject() private authService: AuthService) {}

    @Post('signin')
    async signin(@Body() signinDto: SigninDto): Promise<SigninResponseDto> {
        const token = await this.authService.signin(
            signinDto.email,
            signinDto.password
        );

        return { access_token: token };
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() signupDto: SignupDto) {
        const user = new User(
            signupDto.email,
            signupDto.name,
            signupDto.password
        );
        const createdUser = await this.authService.signup(user);
        return { id: createdUser.id };
    }
}
