import app from "./app"
import { AppDataSource } from "./data-source"
import errorMiddleware from "./middlewares/error.middleware"

;(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data source initialized")
    })
    .catch((err) => {
      console.error("Error during data source initialization")
    })

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at port ${process.env.PORT || 3000}`)
  })
})()
