import { prisma } from '../database/prisma-client';
import { UserCreate, User, UserRepository } from '../interfaces/user.interface';

// Here we're making the database operations
export default class UserRepositoryPrisma implements UserRepository {
  // Creating an user
  async createUser(data: UserCreate): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });

    return newUser;
  }

  // Searching for an user through email
  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return result;
  }

  async findById(id: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return result
  }


  async deleteUser(id: string): Promise<boolean> {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return deleteUser ? true : false;
  }

  async editUser(id: string, name: string, email: string): Promise<User> {
    const editUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email
      }
    })

    return editUser
  }
}
