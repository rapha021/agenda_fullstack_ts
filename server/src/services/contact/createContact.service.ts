import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IContactRequestData } from "../../interfaces/contact.interface"

const createContactService = async (data: IContactRequestData, id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact)
  const userRepository = AppDataSource.getRepository(User)

  const emailAlreadyExists = await contactRepository.findOneBy({
    email: data.email,
  })

  if (emailAlreadyExists) {
    throw new AppError(409, "Email já está sendo utilizado para um contato")
  }

  const numberAlreadyExists = await contactRepository.findOneBy({
    number: data.number,
  })

  if (numberAlreadyExists) {
    throw new AppError(409, "Número já está sendo utilizado para um contato")
  }

  const user = await userRepository.findOneBy({ id })

  const contact = await contactRepository.save({ ...data, user: user! })

  return contact
}

export default createContactService
