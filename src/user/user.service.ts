import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'argon2';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
  }
}
