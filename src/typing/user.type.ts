export interface User {
    email: string
    password: string   
}

export interface UserResponse extends Pick<User, 'email'> {
    createdAt: Date
}