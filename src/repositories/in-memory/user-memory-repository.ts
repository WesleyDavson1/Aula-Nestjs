import { User } from 'src/entities/user.entity';
import { UserRepository } from '../user/user-repository';

export class UserMemoryRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((e) => e.id === id);
  }

  async findByAll(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((e) => e.email === email);
  }

  async update(user: User): Promise<User> {
    const updateUser = this.users.findIndex((u) => u.id === user.id);
    this.users[updateUser] = user;
    return;
  }

  async delete(id: string): Promise<void> {
    const deleteUser = this.users.findIndex((d) => d.id === id)
    this.users.splice(deleteUser, 1)

  }
}
