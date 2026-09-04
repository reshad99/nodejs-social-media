export abstract class PasswordHasherPort {
  abstract hash(password: string): Promise<string>;
  abstract compare(plainPassword: string, passwordHash: string): Promise<boolean>;
}
