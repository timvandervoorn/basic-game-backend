"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./game/controller");
const app = routing_controllers_1.createKoaServer({
    controllers: [controller_1.default],
    cors: true
});
db_1.default()
    .then(_ => app.listen(3001, () => console.log("Listening on port 3001")))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map