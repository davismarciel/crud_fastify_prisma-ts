export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  user_id?: string
}

export interface ContactCreate {
  name: string;
  email: string;
  phone: string;
  user_email: string;
}

export interface ContactCreateData {
  name: string;
  email: string;
  phone: string;
  user_id: string;
}

export interface ContactRepository {
  createContact(data: ContactCreateData): Promise<Contact>
  findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>
  deleteContact(id: string): Promise<Contact>
  listAllContacts(userEmail: string): Promise<Contact[]>
  editContact(id: string, name: string, email: string, phone: string): Promise<Contact>
  findContactById(id: string): Promise<Contact | null>
}
