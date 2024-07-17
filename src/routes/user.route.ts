import { FastifyInstance } from 'fastify';
import { UserUseCase } from '../usecases/user.usecase';
import { User, UserCreate } from '../interfaces/user.interface';

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
    const { name, email }: UserCreate = req.body;

    try {
      const data = await userUseCase.createUser({ name, email });
      reply.send({ message: 'User was created sucessfully', data });

      return data;
    } catch (error) {
      reply.send(error)
    }
  });

  fastify.get<{Params: {id: string}, Body: string}>('/profile/:id', async (req, reply) => {
    const { id } = req.params

    const user = await userUseCase.findUserById(id)

    reply.send({user})
  })

  
  fastify.delete<{ Params: User }>('/:id', async (req, reply) => {
    const { id } = req.params

    await userUseCase.deleteUser(id)
    
    reply.send({message: "User deleted sucessfully"});
  });

  fastify.put<{ Params: User; Body: UserCreate }>('/edit/:id', async (req, reply) => {
    const { id } = req.params
    const {name, email} = req.body

    await userUseCase.editUser(id, name, email)
    
    reply.send({message: "User edited sucessfully"});
  });
}
