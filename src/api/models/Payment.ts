import { sequelize } from "./index"
import { DataTypes } from "sequelize";

import User from "./User"

const Payment = sequelize.define("Payment", {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    toss_billing_key: {
        type: DataTypes.STRING,
        unique: true,
    }
})

export default Payment