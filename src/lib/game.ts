const defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]]

const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length

const colors = ["red", "blue", "green", "yellow", "magenta"]

const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

export { defaultBoard, moves, randomColor, colors }
