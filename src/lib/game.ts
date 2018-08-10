import { ForbiddenError, BadRequestError } from "routing-controllers"
import { Validator } from "class-validator"

const validator = new Validator()

const defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]]

const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length

const colors = ["red", "blue", "green", "yellow", "magenta"]

const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

const validateInput = (game, update) => {
  if (update.id) throw new ForbiddenError(`It is not allowed to update the id`)

  if (update.board) {
    if (moves(game.board, update.board) > 1) {
      throw new BadRequestError(`You cannot make more than one move.`)
    }
  }

  console.log(update.name)

  if (update.name === "") {
    {
      throw new ForbiddenError(`Provide more than one character.`)
    }
  }

  if (update.color) {
    if (!validator.isIn(update.color, colors)) {
      throw new ForbiddenError(
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

export { defaultBoard, moves, randomColor, colors, validateInput }
