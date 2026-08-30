import { User, UserGender } from '../entities/user.entity';

export interface CreateUserData {
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  gender?: UserGender;
  birthDate?: Date | null;
}

export interface UpdateUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: UserGender;
  birthDate?: Date | null;
  isActive?: boolean;
}

export abstract class UserRepository {
  abstract create(data: CreateUserData): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(id: number, data: UpdateUserData): Promise<User>;
  abstract delete(id: number): Promise<void>;
}
