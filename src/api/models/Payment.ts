import { sequelize } from "./index"
import { DataTypes } from "sequelize";

import User from "./User"

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    toss_billing_key: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
})

export default Payment