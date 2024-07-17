import { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contact.usecase';
import { User, UserCreate } from '../interfaces/user.interface';
import { UserUseCase } from '../usecases/user.usecase';
import type { Contact, ContactCreate } from '../interfaces/contact.interface';
import { authMiddleware } from '../middlewares/auth.middleware';

// User method routes

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.addHook('preHandler', authMiddleware)
  fastify.post<{ Body: ContactCreate }>('/', async (req, reply) => {
    const { name, email , phone } = req.body;
    const userEmail = req.headers['email'] as string
    try {
      const data = await contactUseCase.createContact({ email, name, phone, user_email: userEmail});
      reply.send({ message: 'Contact was created sucessfully', data });

      return data;
    } catch (error) {
      reply.send(error)
    }
  });

  fastify.get('/', async (req, reply) => {
    const emailUser = req.headers['email'] as string
    try {
      const result = await contactUseCase.listAllContacts(emailUser)

      reply.send(result)

    } catch (error) {
      reply.send({error: "There was an errror while trying to load the contacts"})
    }
  })

  
  fastify.delete<{ Params: {id: string}, Body: {userEmail: string} }>('/:id', async (req, reply) => {
    const { id } = req.params
    const { userEmail } = req.body
    const user = await contactUseCase.findUserByEmail(userEmail);
    const contact = await contactUseCase.findContactById(id);

    if (contact.user_id !== user.id) {
      reply.status(401).send()
    }

    await contactUseCase.deleteContact(id)
    
    reply.send({message: "Contact deleted sucessfully"});
  });

  fastify.put<{ Params: {id: string}; Body: {
    name: string, email: string, phone: string, user_id: string
  } }>('/:id', async (req, reply) => {
    const { id } = req.params
    const {name, email, phone, user_id } = req.body

    
    const userEmail = req.headers['email'] as string
    
    try {
      const user = await contactUseCase.findUserByEmail(userEmail);
      const contact = await contactUseCase.findContactById(id);
    
      if (contact.user_id !== user.id) {
        reply.status(401).send()
      }

      await contactUseCase.editContact(id, name, email, phone);
      return reply.send({ message: "Contact was updated successfully" });
    } catch (error) {
      reply.status(422).send("There was an error while trying to edit the contact");
    }
  });
}
