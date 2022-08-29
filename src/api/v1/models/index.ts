import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../../config/DBConfig";
import isemail from "isemail"

export const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: "mysql"
    }
)

//test connection
sequelize.authenticate()
    //success
    .then(() => {
        console.log("authentication complete!")
    })
    //got error
    .catch(err => {
        throw err
    })

export const User = sequelize.define("User", {
    id: {
        //uuid v4 => 36byte
        type: DataTypes.STRING(36),
        primaryKey: true,
    },
    username: {
        //korean 12lenght username => 36byte
        type: DataTypes.STRING(36),
        allowNull: false,
        validate: {
            len: {
                args: [4, 12],
                msg: "username은 4글자 이상 12글자 이하여야 합니다."
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "이메일이 유효하지 않습니다" }

        }
    },
    encrypted_password: {
        //md5 hashed string => 32byte
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
})

export const Store = sequelize.define("Store", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    }
})