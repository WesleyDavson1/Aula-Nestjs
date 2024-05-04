import { UserRepository } from 'src/repositories/user/user-repository';
import { User } from "src/entities/user.entity"
import { hash } from 'bcrypt';
import { error } from 'console';


interface RegisterUserRequest{
  name: string
  email: string
  password: string
}

interface RegisterUserResponse{
  user: User
}


export class RegisterUserUseCase{
 constructor(private userRepository: UserRepository){}

 async execute({name, email, password}: RegisterUserRequest): Promise<RegisterUserResponse>{
    const passwordCryp = await hash(password, 3);

    const existEmail = await this.userRepository.findByEmail(email)
    if(existEmail){
      throw new error('Email ja existe')
    }

    const newUser = User.save( name, email, passwordCryp)

    const user = await this.userRepository.save(newUser)


    return {user}

 }


}