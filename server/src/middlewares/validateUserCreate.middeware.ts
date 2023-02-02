import { IUserRequestData } from "../interfaces/userData.interface"
import * as yup from "yup"

import { SchemaOf } from "yup"
import { NextFunction, Request, Response } from "express"

export const userCreateSchema: SchemaOf<IUserRequestData> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  number: yup.string().required(),
})

export const validateUserCreate =
  (schema: SchemaOf<IUserRequestData>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        })

        req.newUser = validatedData

        next()
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors,
        })
      }
    } catch (err) {
      next(err)
    }
  }
