import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../../domain/exceptions/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(id: number): Promise<void> {
    if (!(await this.users.findById(id))) {
      throw new UserNotFoundError();
    }

    await this.users.delete(id);
  }
}
