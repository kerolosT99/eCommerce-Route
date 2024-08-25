export interface registerData extends loginData {
    name: string;
    rePassword: string;
    phone: string;
}

export interface loginData extends userEmail {
    password: string
}

export interface userEmail {
    email: string
}
export interface NewLoginData extends userEmail {
    newPassword: string
}

