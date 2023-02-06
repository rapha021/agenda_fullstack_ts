export interface IContact {
  id: string
  name: string
  email: string
  number: string
  createdAt: string
}

export interface IContactEdit {
  name?: string
  email?: string
  number?: string
  id: string
}
