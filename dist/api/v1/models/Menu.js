"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
const BUser_1 = __importDefault(require("./BUser"));
const Menu = index_1.sequelize.define("Menu", {
    id: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
Menu.belongsTo(BUser_1.default, {
    foreignKey: "store_id"
});
exports.default = Menu;
//# sourceMappingURL=Menu.js.map