"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];
exports.defaultBoard = defaultBoard;
const moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b)).length;
exports.moves = moves;
const colors = ["red", "blue", "green", "yellow", "magenta"];
exports.colors = colors;
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
exports.randomColor = randomColor;
//# sourceMappingURL=game.js.map