import "express-async-errors"

import express from "express"
import { appRoutes } from "./routes"
import errorMiddleware from "./middlewares/error.middleware"
import cors from "cors"
import corsMiddleware from "./middlewares/cors.middleware"

const app = express()

app.use(express.json())

app.use(cors())
app.use(corsMiddleware)

appRoutes(app)

app.use(errorMiddleware)

export default app
