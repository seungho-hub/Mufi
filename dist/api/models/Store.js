"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
const Menu_1 = __importDefault(require("./Menu"));
//store는 mufi측에서 id만 채워서 등록됨.
const Store = index_1.sequelize.define("Store", {
    //매장 uuid
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    //매장 이름
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    //매장 설명
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    //우편 번호
    zip_code: {
        type: sequelize_1.DataTypes.STRING(10),
        unique: false
    },
    //상세 주소
    detail_address: {
        type: sequelize_1.DataTypes.STRING,
    },
    buser_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.NOW
    },
    registered: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    }
});
Store.hasMany(Menu_1.default, {
    foreignKey: "store_id"
});
exports.default = Store;
//# sourceMappingURL=Store.js.map