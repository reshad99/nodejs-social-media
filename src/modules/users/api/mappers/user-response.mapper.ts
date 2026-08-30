import { User } from '../../domain/entities/user.entity';

export interface UserResponse {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  gender: User['gender'];
  birthDate: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserResponseMapper {
  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      birthDate: user.birthDate
        ? user.birthDate.toISOString().slice(0, 10)
        : null,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
