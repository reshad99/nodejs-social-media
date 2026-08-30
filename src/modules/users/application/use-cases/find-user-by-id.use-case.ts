import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserNotFoundError } from '../../domain/exceptions/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.users.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
