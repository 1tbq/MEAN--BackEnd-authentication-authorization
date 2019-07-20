export class User {
    _id:string;
    email:string;
    password:string
}

export interface LoginResponse{
    success:boolean,
    token:string
}

export interface SignupResponse{
    success:boolean,
    message:string
}

export interface logoutResponse{
    success:true;
}