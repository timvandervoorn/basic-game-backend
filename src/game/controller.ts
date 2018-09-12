import {
  JsonController,
  Get,
  Post,
  HttpCode,
  Body,
  Patch,
  Param,
  NotFoundError
} from "routing-controllers"
import Game from "./entity"
import { randomColor, defaultBoard } from "../lib/game"
import { validateInput } from "./validation"

@JsonController()
export default class GameController {
  @Get("/games")
  async getGames() {
    const games = await Game.find()
    if (!games.length) return { message: "No games yet!" }
    return { games }
  }

  @Get("/games/:id")
  async getGame(@Param("id") id: number) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError(`Game with ID ${id} was not found`)
    return game
  }

  @Post("/games")
  @HttpCode(201)
  createGame(@Body() game: Game) {
    game.board = defaultBoard
    game.color = randomColor()
    return game.save()
  }

  @Patch("/games/:id")
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError(`Game with ID ${id} was not found`)
    validateInput(game, update)
    return Game.merge(game, update).save()
  }
}
