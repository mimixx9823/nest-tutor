import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from './get-user.decorator';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authDto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user', user);
  }
}
