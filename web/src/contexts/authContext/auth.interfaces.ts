import { ReactNode } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { IContact } from "../../interface/contacts.interface"
import { IUser } from "../../interface/user.interface"

export interface IAuthContext {
  handleLogin: SubmitHandler<FieldValues>
  handleRegister: SubmitHandler<FieldValues>
  loading: boolean
  setLoading: IBoolean
  error: boolean
  setError: IBoolean
  authenticated: boolean
  setAuthenticated: IBoolean
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  contacts: IContact[]
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>
  token: string | undefined
}

interface IBoolean {
  on: () => void
  off: () => void
  toggle: () => void
}

export interface IAuthProps {
  children: ReactNode
}
