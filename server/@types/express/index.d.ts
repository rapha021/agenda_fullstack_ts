import * as express from "express"
import { IUserRequestData } from "../../src/interfaces/userData.interface"
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      }
      newUser: IUserRequestData
    }
  }
}
