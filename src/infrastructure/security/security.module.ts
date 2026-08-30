import { Module } from '@nestjs/common';
import { PasswordHasherPort } from '../../shared/application/ports/password-hasher.port';
import { BcryptPasswordHasher } from './bcrypt-password-hasher';

@Module({
  providers: [
    BcryptPasswordHasher,
    {
      provide: PasswordHasherPort,
      useExisting: BcryptPasswordHasher,
    },
  ],
  exports: [PasswordHasherPort],
})
export class SecurityModule {}
