"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
const Store = index_1.sequelize.define("Store", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    registeredAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.NOW
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.NOW,
    }
});
exports.default = Store;
//# sourceMappingURL=Store.js.map