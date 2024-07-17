import fastify from 'fastify';
import { User, UserCreate, UserRepository } from '../interfaces/user.interface';
import UserRepositoryPrisma from '../repositories/user.repository';

export class UserUseCase {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async createUser({ name, email }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    if (verifyIfUserExists) {
      throw new Error('User already exists');
    }
    const result = await this.userRepository.createUser({ email, name });

    return result;
  }

 async deleteUser(id: string) {
  const deleteUser = await this.userRepository.deleteUser(id);

  return deleteUser;  
 }

 async editUser(id: string, name: string, email: string): Promise<User> { 
  return await this.userRepository.editUser(id, name, email);
 }

 async findUserById(id: string) {
  return await this.userRepository.findById(id)
 }

}
