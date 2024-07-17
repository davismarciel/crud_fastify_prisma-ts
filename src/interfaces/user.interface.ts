export interface User {
    id: string
    email: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export interface UserCreate {
    name: string
    email: string
}

export interface UserRepository {
    createUser(data: UserCreate): Promise<User>
    findByEmail(email: string): Promise<User | null>
    deleteUser(id: string): Promise<boolean>
    editUser(id: string, name: string, email: string): Promise<User>
    findById(id: string): Promise<User | null>
}
