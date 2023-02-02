import { Express } from "express"
import userAuthController from "../controllers/auth/userAuth.controller"
import createContactController from "../controllers/contact/createContact.controller"
import listContactsController from "../controllers/contact/listContacts.controller"
import createUserController from "../controllers/user/createUser.controller"
import deleteUserController from "../controllers/user/deleteUser.controller"
import listUserController from "../controllers/user/listUser.controller"
import updateUserController from "../controllers/user/updateUser.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import {
  userCreateSchema,
  validateUserCreate,
} from "../middlewares/validateUserCreate.middeware"

export const appRoutes = (app: Express) => {
  app.post("/user", validateUserCreate(userCreateSchema), createUserController)
  app.get("/user", ensureAuthMiddleware, listUserController)
  app.patch("/user", ensureAuthMiddleware, updateUserController)
  app.delete("/user", ensureAuthMiddleware, deleteUserController)

  app.post("/user/login", userAuthController)

  app.post("/contact", ensureAuthMiddleware, createContactController)
  app.get("/contact", ensureAuthMiddleware, listContactsController)
}
