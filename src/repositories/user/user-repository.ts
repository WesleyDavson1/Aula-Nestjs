import { User } from "src/entities/user.entity";

;


export abstract class UserRepository{
  abstract save(user: User): Promise<User>
  abstract findById(id: string): Promise<User>
  abstract findByAll(): Promise<User[]>
  abstract findByEmail(email: string): Promise<User>
  abstract update(user: User): Promise<User>
  abstract delete(id: string): Promise<void>
}