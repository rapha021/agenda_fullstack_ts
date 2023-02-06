import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IContactRequestData } from "../../interfaces/contact.interface"

const updateContactService = async (
  contactId: string,
  data: IContactRequestData,
  userId: string
) => {
  const contactRepository = AppDataSource.getRepository(Contact)
  const userRepository = AppDataSource.getRepository(User)

  let user = await userRepository.findOneBy({ id: userId })

  let contact = user?.contacts.find((contact) => contact.id === contactId)

  if (!contact) {
    throw new AppError(404, "Contato não encontrado.")
  }


  await contactRepository.update(contactId, data)

  user = await userRepository.findOneBy({ id: userId })

  contact = user?.contacts.find((contact) => contact.id === contactId)

  return contact
}

export default updateContactService
