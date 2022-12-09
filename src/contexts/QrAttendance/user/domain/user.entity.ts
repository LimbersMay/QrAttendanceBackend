
export interface UserEntity {
    userId: string,
    email: string,
    password: string,
    name: string,
    mothersName: string,
    fathersName: string,
    updatedAt?: Date,
    createdAt?: Date
}
