export interface ILoginForm {
    email : string,
    password : string
}

export interface IRegisterForm {
    fullName : string,
    email : string,
    password : string,
    phone : string
}

export interface IUserData {
    id : number,
    email : string,
    name : string,
    avatar : string,
    authToken : string,
}