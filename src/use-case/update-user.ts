import { error } from "console";
import { User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories/user/user-repository";

interface UpdateUserUseCaseRequest{
  id: string
  email: string
  password: string
}

interface UpdateUserUseCaseResponse{
  user: User
}



export class UpdateUser{
  constructor(private userRepository: UserRepository){}

  async execute({id, email, password}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse>{



    const userBd = await this.userRepository.findById(id)
    if(!userBd){
      throw new error('Usuario não existe')
    }

    const existEmail = await this.userRepository.findByEmail(email)
    if(!existEmail){
      throw new error ('Email ja existe')
    }

    userBd.email = email;
    userBd.password = password

    const updatedUser = await this.userRepository.update(userBd);


    return { user: updatedUser };


  }

}