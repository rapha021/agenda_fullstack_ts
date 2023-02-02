import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id })

  if (!user) {
    throw new AppError(404, "Usuário não encontrado.")
  }

  await userRepository.delete({ id: user.id })

  return user
}

export default deleteUserService
