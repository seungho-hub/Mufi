"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const models_1 = require("./api/v1/models");
const port = app_1.app.get("port");
const server = app_1.app.listen(port, onListening);
server.on("error", onError);
server.on("close", models_1.sequelize.close);
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    //connect to database
    models_1.sequelize.sync({ force: false })
        .then(() => {
        console.log("connected succefully");
    })
        .catch(err => {
        console.log("connect failed");
    });
}
exports.default = server;
//# sourceMappingURL=server.js.map