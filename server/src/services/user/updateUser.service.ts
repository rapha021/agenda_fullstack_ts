import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserRequestData } from "../../interfaces/userData.interface"

const updateUserService = async (data: IUserRequestData, id: string) => {
  const { email, name, number, password } = data
  const userRepository = AppDataSource.getRepository(User)

  if (email) {
    const emailAlreadyExists = await userRepository.findOneBy({ email })

    if (emailAlreadyExists) {
      throw new AppError(409, "Esse email já está sendo utilizado")
    }
  }

  await userRepository.update(id, data)

  const updatedUser = await userRepository.findOneBy({ id })

  return updatedUser
}

export default updateUserService
