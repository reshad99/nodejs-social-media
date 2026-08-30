export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('User with this email already exists');
    this.name = EmailAlreadyInUseError.name;
  }
}
