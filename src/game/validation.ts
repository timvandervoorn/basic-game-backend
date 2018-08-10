import {
  ForbiddenError,
  BadRequestError,
  NotFoundError
} from "routing-controllers"
import { Validator } from "class-validator"
import { moves, colors } from "../lib/game"

const forbidden = "forbidden"
const badRequest = "badRequest"
const notFound = "notFound"
const validator = new Validator()

const validateInput = (game, update) => {
  if (update.id) handleError(forbidden, `It is not allowed to update the id`)

  if (update.board) {
    if (moves(game.board, update.board) > 1)
      handleError(badRequest, `You cannot make more than one move.`)
  }

  if (update.name === "")
    handleError(forbidden, `Provide more than one character.`)

  if (update.color) {
    if (!validator.isIn(update.color, colors)) {
      handleError(
        forbidden,
        `${capitalizeFirstLetter(
          update.color
        )} is not allowed. Make sure that you use follow colors:${colors.map(
          color => ` ${color}`
        )}.`
      )
    }
  }
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const handleError = (type: string, msg: string) => {
  switch (type) {
    case forbidden:
      console.log("Forbidden runs")
      throw new ForbiddenError(msg)

    case badRequest:
      console.log("Bad req runs")
      throw new BadRequestError(msg)

    case notFound:
      console.log("Not found runs")
      throw new NotFoundError(msg)
  }
}

export { validateInput }
