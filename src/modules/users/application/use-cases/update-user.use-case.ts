import { Injectable } from '@nestjs/common';
import { User, UserGender } from '../../domain/entities/user.entity';
import { EmailAlreadyInUseError } from '../../domain/exceptions/email-already-in-use.error';
import { UserNotFoundError } from '../../domain/exceptions/user-not-found.error';
import { UserRepository } from '../../domain/repositories/user.repository';

export interface UpdateUserCommand {
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: UserGender;
  birthDate?: string;
  isActive?: boolean;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly users: UserRepository) { }

  async execute(id: number, command: UpdateUserCommand): Promise<User> {
    const user = await this.users.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (command.email && command.email !== user.email) {
      if (await this.users.findByEmail(command.email)) {
        throw new EmailAlreadyInUseError();
      }
    }

    return this.users.update(id, {
      ...command,
      birthDate: command.birthDate
        ? new Date(`${command.birthDate}T00:00:00.000Z`)
        : undefined,
    });
  }
}
