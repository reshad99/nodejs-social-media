import { UserResponseMapper } from '../../../users/api/mappers/user-response.mapper';
import { User } from '../../../users/domain/entities/user.entity';
import { LoginResult } from '../../application/use-cases/login-user.use-case';

export class LoginResponseMapper {
  static toResponse(loginResult: LoginResult) {
    return {
      message: 'User logged in successfully',
      accessToken: loginResult.accessToken,
      user: UserResponseMapper.toResponse(loginResult.user)
    };
  }
}
