export interface UserData {
    message: string;
    user: User;
    token: Token;

}

export interface User {
    name: string;
    email: string;
    role: string;
}

export interface Token {
    token: string
}