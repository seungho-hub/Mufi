"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const sequelize_1 = require("sequelize");
const Payment = index_1.sequelize.define("Payment", {
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    toss_billing_key: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    }
});
exports.default = Payment;
//# sourceMappingURL=Payment.js.map