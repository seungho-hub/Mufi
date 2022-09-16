"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
const Menu = index_1.sequelize.define("Menu", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    label: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    store_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
});
exports.default = Menu;
//# sourceMappingURL=Menu.js.map