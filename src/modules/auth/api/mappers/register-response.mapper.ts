import { UserResponseMapper } from '../../../users/api/mappers/user-response.mapper';
import { User } from '../../../users/domain/entities/user.entity';

export class RegisterResponseMapper {
  static toResponse(user: User) {
    return {
      message: 'User registered successfully',
      user: UserResponseMapper.toResponse(user)
    };
  }
}
