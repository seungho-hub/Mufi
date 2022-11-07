import { sequelize } from "./index"
import { DataTypes, NOW, DataType } from 'sequelize';
import Store from "./BUser"

const Photo = sequelize.define("Photo", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    updatedAt: false,
})

export default Photo
