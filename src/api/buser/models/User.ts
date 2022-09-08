import { sequelize } from "./index"
import { DataTypes } from "sequelize";

//user는 무조건 oauth profile로 등록됨.
//현재는 kakao oauth service만 사용중
const User = sequelize.define("User", {
    id: {
        //uuid v4 => 36byte
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
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
        },
        unique: true,
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
