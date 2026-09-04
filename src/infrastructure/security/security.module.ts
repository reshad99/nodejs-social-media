import { Module } from '@nestjs/common';
import { PasswordHasherPort } from '../../shared/application/ports/password-hasher.port';
import { BcryptPasswordHasher } from './bcrypt-password-hasher';
import { JwtTokenIssuer } from './jwt-token-issuer';
import { TokenIssuerPort } from '../../modules/auth/application/ports/token-issuer.port';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(config.get<string>('JWT_ACCESS_TTL_SECONDS') ?? 900)
        }
      })
    })
  ],
  providers: [
    BcryptPasswordHasher,
    {
      provide: PasswordHasherPort,
      useExisting: BcryptPasswordHasher,
    },
    JwtTokenIssuer,
    {
      provide: TokenIssuerPort,
      useExisting: JwtTokenIssuer
    }
  ],
  exports: [PasswordHasherPort, TokenIssuerPort],
})
export class SecurityModule { }
