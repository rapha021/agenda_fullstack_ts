import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const deleteContactService = async (contactId: string, userId: string) => {
  const contactRepository = AppDataSource.getRepository(Contact)
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id: userId })

  const contact = user?.contacts.find((contact) => contact.id === contactId)

  if (!contact) {
    throw new AppError(404, "Contato não encontrado.")
  }

  contactRepository.delete(contactId)

  return
}

export default deleteContactService
