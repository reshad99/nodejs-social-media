import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserGender } from '../../../users/domain/entities/user.entity';
import { RegisterDto } from './register.dto';

describe('RegisterDto', () => {
  it('accepts and normalizes valid registration data', async () => {
    const dto = plainToInstance(RegisterDto, {
      email: '  USER@example.com ',
      password: 'password123',
      firstName: '  Ali  ',
      gender: UserGender.MALE,
    });

    await expect(validate(dto)).resolves.toHaveLength(0);
    expect(dto.email).toBe('user@example.com');
    expect(dto.firstName).toBe('Ali');
  });

  it('rejects invalid registration data', async () => {
    const dto = plainToInstance(RegisterDto, {
      email: 'not-an-email',
      password: 'short',
      gender: 'INVALID',
      unexpectedField: true,
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    expect(errors.map((error) => error.property)).toEqual(
      expect.arrayContaining([
        'email',
        'password',
        'gender',
        'unexpectedField',
      ]),
    );
  });
});
