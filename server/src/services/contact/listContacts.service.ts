import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"

const listContactsService = async (id: string) => {
  const contactsRepository = AppDataSource.getRepository(Contact)
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id })

  const contacts = await contactsRepository.findBy({ user: { id: user!.id } })

  if (contacts.length > 0) {
    return contacts
  }

  return { message: "Sem contatos" }
}

export default listContactsService
