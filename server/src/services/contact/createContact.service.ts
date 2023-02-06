import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IContactRequestData } from "../../interfaces/contact.interface"

const createContactService = async (data: IContactRequestData, id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact)
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id })

  if (!user) {
    throw new AppError(404, "Usuário não encontrado")
  }

  user.contacts.map((contact) => {
    if (contact.email === data.email) {
      throw new AppError(409, "Email já está sendo utilizado para um contato")
    }

    if (contact.number === data.number) {
      throw new AppError(409, "Número já está sendo utilizado para um contato")
    }
  })

  const contact = await contactRepository.save({ ...data, user: user })

  return contact
}

export default createContactService
