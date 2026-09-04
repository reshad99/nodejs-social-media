import { Injectable } from '@nestjs/common';
import { PasswordHasherPort } from '../../../../shared/application/ports/password-hasher.port';
import { User, UserGender } from '../../../users/domain/entities/user.entity';
import { EmailAlreadyInUseError } from '../../../users/domain/exceptions/email-already-in-use.error';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { InvalidCredentialsError } from '../../domain/exceptions/invalid_credentials.error';
import { TokenIssuerPort } from '../ports/token-issuer.port';

export interface LoginCommand {
  email: string;
  password: string;
}

export interface LoginResult {
  user: User;
  accessToken: string;
}

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly tokenIssuer: TokenIssuerPort
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    const user = await this.users.findByEmail(command.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await this.passwordHasher.compare(command.password, user.passwordHash)
    if(!passwordMatches || !user.isActive){
        throw new InvalidCredentialsError();
    }

    const accessToken = await this.tokenIssuer.issue({
      sub: user.id,
      email: user.email
    })


    return {user, accessToken};
  }
}
