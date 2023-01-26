
export interface UserEntity {
    userId: string,
    email: string,
    password: string,
    name: string,
    lastname: string,
    updatedAt?: Date,
    createdAt?: Date
}
