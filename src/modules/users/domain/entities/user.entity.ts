export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string | null;
  lastName: string | null;
  gender: UserGender | null;
  birthDate: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
