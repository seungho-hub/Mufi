import { sequelize } from "./index"
import { DataTypes } from "sequelize";

import Payment from "./Payment"

//user는 무조건 oauth profile로 등록됨.
//현재는 kakao oauth service만 사용중
const User = sequelize.define("User", {
    id: {
        //uuid v4 => 36byte
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
    },
    username: {
        //korean 12lenght username => 36byte
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: false,
    },
    pfp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
})

export default User
