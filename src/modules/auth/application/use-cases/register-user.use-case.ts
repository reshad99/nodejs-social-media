import { Injectable } from '@nestjs/common';
import { PasswordHasherPort } from '../../../../shared/application/ports/password-hasher.port';
import { User, UserGender } from '../../../users/domain/entities/user.entity';
import { EmailAlreadyInUseError } from '../../../users/domain/exceptions/email-already-in-use.error';
import { UserRepository } from '../../../users/domain/repositories/user.repository';

export interface RegisterUserCommand {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  gender?: UserGender;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    if (await this.users.findByEmail(command.email)) {
      throw new EmailAlreadyInUseError();
    }

    const passwordHash = await this.passwordHasher.hash(command.password);

    return this.users.create({
      email: command.email,
      passwordHash,
      firstName: command.firstName,
      lastName: command.lastName,
      gender: command.gender,
    });
  }
}
