import { sequelize } from "./index"
import { DataTypes, NOW } from "sequelize";

//store는 mufi측에서 id만 채워서 등록됨.
const bUsers = sequelize.define("bUser", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    //username
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    encrypted_password: {
        type: DataTypes.STRING(32),
        allowNull: true,
    },
    registeredAt: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
})

export default bUsers
