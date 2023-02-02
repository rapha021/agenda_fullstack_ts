import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserRequestData } from "../../interfaces/userData.interface"
import bcrypt from "bcryptjs"

const createUserService = async (data: IUserRequestData) => {
  const { name, email, number, password } = data

  const userRepository = AppDataSource.getRepository(User)

  const emailAlreadyExists = await userRepository.findOneBy({ email })

  if (emailAlreadyExists) {
    throw new AppError(409, "Email já está sendo utilizado.")
  }

  await userRepository.save({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    number,
  })

  const createdUser = await userRepository.findOneBy({ email })

  return createdUser
}

export default createUserService
