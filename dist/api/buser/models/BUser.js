"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
const Store_1 = __importDefault(require("./Store"));
const Menu_1 = __importDefault(require("./Menu"));
//store는 mufi측에서 id만 채워서 등록됨.
const BUsers = index_1.sequelize.define("bUser", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    //username
    username: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isEmail: true,
        }
    },
    encrypted_password: {
        type: sequelize_1.DataTypes.STRING(32),
        allowNull: true,
    },
    registeredAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.NOW
    }
});
BUsers.hasMany(Store_1.default, {
    foreignKey: "buser_id",
});
BUsers.hasMany(Menu_1.default, {
    foreignKey: "buser_id"
});
exports.default = BUsers;
//# sourceMappingURL=BUser.js.map