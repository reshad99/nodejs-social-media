import { jest } from '@jest/globals';
import { PasswordHasherPort } from '../../../../shared/application/ports/password-hasher.port';
import { User, UserGender } from '../../../users/domain/entities/user.entity';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
  it('hashes the password and creates a user through the repository port', async () => {
    const command = {
      email: 'user@example.com',
      password: 'password123',
      firstName: 'Ali',
      gender: UserGender.MALE,
    };
    const registeredUser: User = {
      id: 1,
      email: command.email,
      passwordHash: 'hashed-password',
      firstName: command.firstName,
      lastName: null,
      gender: command.gender,
      isActive: true,
      birthDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const users = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(registeredUser),
    };
    const passwordHasher = {
      hash: jest.fn().mockResolvedValue('hashed-password'),
      compare: jest.fn().mockResolvedValue(false),
    };
    const useCase = new RegisterUserUseCase(
      users as unknown as UserRepository,
      passwordHasher as unknown as PasswordHasherPort,
    );

    await expect(useCase.execute(command)).resolves.toEqual(registeredUser);
    expect(passwordHasher.hash).toHaveBeenCalledWith(command.password);
    expect(users.create).toHaveBeenCalledWith({
      email: command.email,
      passwordHash: 'hashed-password',
      firstName: command.firstName,
      lastName: undefined,
      gender: command.gender,
    });
  });
});
