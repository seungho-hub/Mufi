"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const DBConfig_1 = __importDefault(require("../../config/DBConfig"));
exports.sequelize = new sequelize_1.Sequelize(DBConfig_1.default.database, DBConfig_1.default.user, DBConfig_1.default.password, {
    host: DBConfig_1.default.host,
    dialect: "mysql"
});
exports.sequelize.connectionManager.getConnection;
//test connection
exports.sequelize.authenticate()
    //success
    .then(() => {
    console.log("Data authentication sucessfully completed");
})
    //got error
    .catch(err => {
    throw err;
});
//# sourceMappingURL=index.js.map