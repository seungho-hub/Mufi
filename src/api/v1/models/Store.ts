import { sequelize } from "./index"
import { DataTypes, NOW } from "sequelize";

//store는 mufi측에서 id만 채워서 등록됨.
const Store = sequelize.define("Store", {
    //매장 id, mufi 측에서 등록하는 유일한 field
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    //매장 이름
    name: {
        type: DataTypes.STRING,
    },
    //매장 주소
    address: {
        type: DataTypes.STRING,
    },
    //매장 전화번호
    call: {
        type: DataTypes.STRING,
    },
    registeredAt: {
        type: DataTypes.DATE,
        defaultValue: NOW
    }
})

export default Store
