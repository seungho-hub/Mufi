import { sequelize } from "./index"
import { DataTypes, NOW } from "sequelize";

const Store = sequelize.define("Store", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    registeredAt: {
        type: DataTypes.DATE,
        defaultValue: NOW
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
    }
})

export default Store
