import { type Contact, type ContactCreateData, type ContactRepository } from '../interfaces/contact.interface'
import { prisma } from '../database/prisma-client'
export class ContactRepositoryPrisma implements ContactRepository {

  async createContact(data: ContactCreateData): Promise<Contact> {
    const newContact = await prisma.contacts.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        user_id: data.user_id
      },
    });

    return newContact;
  }

  async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
    const result = await prisma.contacts.findFirst({
      where: {
        OR: [
          {email},
          {phone}
        ]
      }
    })

    return result || null
  } 

  async listAllContacts(user_id: string): Promise<Contact[]> { 
    const result = await prisma.contacts.findMany({
      where: {
        user_id 
      }
    })

    return result
  }

  async editContact(id: string, name: string, email: string, phone: string): Promise<Contact> {
    const result = await prisma.contacts.update({
      where: {
        id
      },
      data: {
        name,
        phone,
        email
      }
    })

    return result
  }

  async findContactById(id: string): Promise<Contact | null> {
    const contact = await prisma.contacts.findUnique({
      where: { id },
    });
    return contact;
  }

  async deleteContact(id: string): Promise<Contact> {
    const result = await prisma.contacts.delete({
      where: {
        id
      }
    })

    return result
  }


}
