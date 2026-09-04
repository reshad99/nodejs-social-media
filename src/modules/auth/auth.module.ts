import { Module } from '@nestjs/common';
import { SecurityModule } from '../../infrastructure/security/security.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './api/controllers/auth.controller';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';

@Module({
  imports: [UsersModule, SecurityModule],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, LoginUserUseCase],
})
export class AuthModule {}
