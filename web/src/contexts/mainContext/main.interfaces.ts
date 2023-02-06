import { FormEvent, ReactNode } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { IContact } from "../../interface/contacts.interface"
import { IUser } from "../../interface/user.interface"

export interface IMain {
  loading: boolean
  setLoading: IBoolean
  error: boolean
  setError: IBoolean
  contacts: IContact[]
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  handleEditContact: SubmitHandler<FieldValues>
  setContactId: React.Dispatch<React.SetStateAction<string>>
  tabs: string
  setTabs: React.Dispatch<React.SetStateAction<string>>
  handleDeleteContact: (e: any) => Promise<void>
  user: IUser
  handleEditUser: SubmitHandler<FieldValues>
  handleCreateContact: (e: any) => Promise<void>
  handleDeleteUser: (e: FormEvent) => Promise<void>
}

export interface IBoolean {
  on: () => void
  off: () => void
  toggle: () => void
}

export interface IMainProviderProps {
  children: ReactNode
}
