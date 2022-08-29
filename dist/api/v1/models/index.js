"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const DBConfig_1 = __importDefault(require("../../config/DBConfig"));
exports.sequelize = new sequelize_1.Sequelize(DBConfig_1.default.database, DBConfig_1.default.user, DBConfig_1.default.password, {
    host: DBConfig_1.default.host,
    dialect: "mysql"
});
//test connection
exports.sequelize.authenticate()
    //success
    .then(() => {
    console.log("authentication complete!");
})
    //got error
    .catch(err => {
    throw err;
});
exports.User = exports.sequelize.define("User", {
    id: {
        //uuid v4 => 36byte
        type: sequelize_1.DataTypes.STRING(36),
        primaryKey: true,
    },
    username: {
        //korean 12lenght username => 36byte
        type: sequelize_1.DataTypes.STRING(36),
        allowNull: false,
        validate: {
            len: {
                args: [4, 12],
                msg: "username은 4글자 이상 12글자 이하여야 합니다."
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "이메일이 유효하지 않습니다" }
        }
    },
    encrypted_password: {
        //md5 hashed string => 32byte
        type: sequelize_1.DataTypes.STRING(32),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    }
});
exports.Store = exports.sequelize.define("Store", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    }
});
//# sourceMappingURL=index.js.map