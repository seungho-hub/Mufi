"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
//user는 무조건 oauth profile로 등록됨.
//현재는 kakao oauth service만 사용중
const User = index_1.sequelize.define("User", {
    id: {
        //uuid v4 => 36byte
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        unique: true,
    },
    username: {
        //korean 12lenght username => 36byte
        type: sequelize_1.DataTypes.STRING(36),
        allowNull: false,
        unique: false,
    },
    pfp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
});
exports.default = User;
//# sourceMappingURL=User.js.map