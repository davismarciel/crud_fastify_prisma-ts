import type { Contact, ContactCreate, ContactRepository } from "../interfaces/contact.interface";
import type { UserRepository } from "../interfaces/user.interface";
import { ContactRepositoryPrisma } from "../repositories/contact.repository";
import UserRepositoryPrisma from "../repositories/user.repository";
class ContactUseCase {
  private contactRepository: ContactRepository
  private userRepository: UserRepository
  constructor() {
    this.contactRepository = new ContactRepositoryPrisma()
    this.userRepository = new UserRepositoryPrisma()
  }

  async createContact({name, email, phone, user_email}: ContactCreate) {
    const user = await this.userRepository.findByEmail(user_email)
      if(!user) {
        throw new Error("User not found")
      }

      const verifyIfExists = await this.contactRepository.findByEmailOrPhone(email, phone)

      if(verifyIfExists) {
        throw new Error("Contact already exists")
      }
    const result = await this.contactRepository.createContact({ email, name, phone, user_id: user.id });

    return result;
  }

  async editContact(id: string, name: string, phone: string, email: string) {
    const result = await this.contactRepository.editContact(id, name, phone, email);
    return result;
  }

  async listAllContacts(userEmail: string) {
    const user = await this.userRepository.findByEmail(userEmail)

    if(!user){
      throw new Error("User not found")
    }

    const contacts = await this.contactRepository.listAllContacts(user.id)

    return contacts
  }


  async findContactById(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findContactById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async deleteContact(id: string): Promise<Contact> {
    const deleteUser = await this.contactRepository.deleteContact(id)

    return deleteUser
  }
}

export { ContactUseCase }