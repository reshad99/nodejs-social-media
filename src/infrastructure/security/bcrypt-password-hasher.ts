import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PasswordHasherPort } from '../../shared/application/ports/password-hasher.port';

@Injectable()
export class BcryptPasswordHasher extends PasswordHasherPort {
  private readonly saltRounds = 10;

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
