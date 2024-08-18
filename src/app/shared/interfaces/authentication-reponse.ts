export interface FailAuthResponse {
    statusMsg: string;
    message: string;
}
export interface SuccessAuthResponse {
    message: string;
    user: User;
    token: string;
}

interface User {
    name: string;
    email: string;
    role: string;
}