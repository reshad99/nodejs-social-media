import { Injectable } from '@nestjs/common';
import { PasswordHasherPort } from '../../../../shared/application/ports/password-hasher.port';
import { User, UserGender } from '../../domain/entities/user.entity';
import { EmailAlreadyInUseError } from '../../domain/exceptions/email-already-in-use.error';
import { UserRepository } from '../../domain/repositories/user.repository';

export interface CreateUserCommand {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  gender?: UserGender;
  birthDate?: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
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
      birthDate: command.birthDate ? new Date(command.birthDate) : undefined,
    });
  }
}
