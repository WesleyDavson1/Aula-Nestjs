import { User } from 'src/entities/user.entity';
import { UserRepository } from '../user/user-repository';
import { PrismaService } from './prisma.service';

export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

  }

  async findByAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(user: User): Promise<User> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async delete(id: string): Promise<void> {
    this.prisma.user.delete({ where: { id } });
  }
}
