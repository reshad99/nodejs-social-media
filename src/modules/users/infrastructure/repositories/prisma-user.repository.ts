import { Injectable } from '@nestjs/common';
import { Gender, Prisma } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { EmailAlreadyInUseError } from '../../domain/exceptions/email-already-in-use.error';
import { User, UserGender } from '../../domain/entities/user.entity';
import {
  CreateUserData,
  UpdateUserData,
  UserRepository,
} from '../../domain/repositories/user.repository';

type PrismaUser = Awaited<ReturnType<PrismaService['user']['findFirstOrThrow']>>;

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: CreateUserData): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: data.passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender ? this.toPrismaGender(data.gender) : undefined,
          birthDate: data.birthDate,
        },
      });

      return this.toDomain(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new EmailAlreadyInUseError();
      }

      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => this.toDomain(user));
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  async update(id: number, data: UpdateUserData): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender ? this.toPrismaGender(data.gender) : undefined,
          birthDate: data.birthDate,
          isActive: data.isActive,
        },
      });

      return this.toDomain(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new EmailAlreadyInUseError();
      }

      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  private toDomain(user: PrismaUser): User {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender ? UserGender[user.gender] : null,\
      birthDate: user.birthDate,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private toPrismaGender(gender: UserGender): Gender {
    return Gender[gender];
  }
}
