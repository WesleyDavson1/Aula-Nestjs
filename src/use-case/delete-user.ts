import { error } from 'console';
import { UserRepository } from 'src/repositories/user/user-repository';

interface DeleteUserRequest {
  id: string;
}

interface DeleteUserResponse {
  msg: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserRequest): Promise<DeleteUserResponse>{
    const user = await this.userRepository.findById(id)

    if(!user){
      throw new error("Usuario não existe")
    }

    await this.userRepository.delete(id)

    return { msg: `${user.name} deletado`}


  }
}
