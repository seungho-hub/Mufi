import { sequelize } from "./index"
import { DataTypes } from "sequelize";

import User from "./User"

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    updatedAt: false,
})

export default Payment