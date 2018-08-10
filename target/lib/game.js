"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const validator = new class_validator_1.Validator();
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
const validateInput = (game, update) => {
    if (update.id)
        throw new routing_controllers_1.ForbiddenError(`It is not allowed to update the id`);
    if (update.board) {
        if (moves(game.board, update.board) > 1) {
            throw new routing_controllers_1.BadRequestError(`You cannot make more than one move.`);
        }
    }
    console.log(update.name);
    if (update.name === "") {
        {
            throw new routing_controllers_1.ForbiddenError(`Provide more than one character.`);
        }
    }
    if (update.color) {
        if (!validator.isIn(update.color, colors)) {
            throw new routing_controllers_1.ForbiddenError(`${capitalizeFirstLetter(update.color)} is not allowed. Make sure that you use follow colors:${colors.map(color => ` ${color}`)}.`);
        }
    }
};
exports.validateInput = validateInput;
const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
//# sourceMappingURL=game.js.map