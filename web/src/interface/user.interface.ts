export interface IUserLogin {
  email: string
  password: string
}

export interface IUserLoginResponse {
  token: string
}

export interface IUserLoginCreate {
  id: string
  name: string
  email: string
  number: string
  createdAt: string
}

export interface IUser {
  id: string
  name: string
  email: string
  number: string
  createdAt: string
}