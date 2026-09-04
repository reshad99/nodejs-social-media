import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponseMapper } from '../mappers/register-response.mapper';
import { LoginDto } from '../dto/login.dto';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';
import { LoginResponseMapper } from '../mappers/login-response.mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    const user = await this.registerUser.execute(dto);
    return RegisterResponseMapper.toResponse(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() dto: LoginDto) {
    const data = await this.loginUser.execute(dto);
    return LoginResponseMapper.toResponse(data);
  }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() dto: LoginDto) {
  //   const user = await this.registerUser.execute(dto);
  //   return RegisterResponseMapper.toResponse(user);
  // }
}
