"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const game_1 = require("../lib/game");
const forbidden = "forbidden";
const badRequest = "badRequest";
const notFound = "notFound";
const validator = new class_validator_1.Validator();
const validateInput = (game, update) => {
    if (update.id)
        handleError(forbidden, `It is not allowed to update the id`);
    if (update.board) {
        if (game_1.moves(game.board, update.board) > 1)
            handleError(badRequest, `You cannot make more than one move.`);
    }
    if (update.name === "")
        handleError(forbidden, `Provide more than one character.`);
    if (update.color) {
        if (!validator.isIn(update.color, game_1.colors)) {
            handleError(forbidden, `${capitalizeFirstLetter(update.color)} is not allowed. Make sure that you use follow colors:${game_1.colors.map(color => ` ${color}`)}.`);
        }
    }
};
exports.validateInput = validateInput;
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
const handleError = (type, msg) => {
    switch (type) {
        case forbidden:
            throw new routing_controllers_1.ForbiddenError(msg);
        case badRequest:
            throw new routing_controllers_1.BadRequestError(msg);
        case notFound:
            throw new routing_controllers_1.NotFoundError(msg);
    }
};
//# sourceMappingURL=validation.js.map