import "reflect-metadata"
import { createKoaServer } from "routing-controllers"
import setupDb from "./db"
import GamesController from "./game/controller"

const app = createKoaServer({
  controllers: [GamesController],
  cors: true
})

setupDb()
  .then(_ => app.listen(3001, () => console.log("Listening on port 3001")))
  .catch(err => console.error(err))
