export interface registerData extends loginData {
    name: string;
    rePassword: string;
    phone: string;
}

export interface loginData {
    email: string
    password: string
}

