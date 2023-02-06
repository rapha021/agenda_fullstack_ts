import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserAuth } from "../../interfaces/userData.interface"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppError } from "../../errors/appError"

const userAuthService = async (data: IUserAuth) => {
  const { email, password } = data

  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ email })

  if (!user) {
    throw new AppError(401, "Email ou senha inválidos")
  }

  const verifyPassword = bcrypt.compareSync(password, user.password)

  if (!verifyPassword) {
    throw new AppError(401, "Email ou senha inválidos")
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: "1d",
  })

  return { token }
}

export default userAuthService
