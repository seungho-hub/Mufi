import { sequelize } from "./index"
import { DataTypes, NOW, DataType } from 'sequelize';
import { Store } from "./Store"

export const Menu = sequelize.define("Menu", {
    label: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    }
},
    {
        indexes: [
            {
                unique: false,
                fields: ['store_id']
            }
        ]
    })

Menu.belongsTo(Store)
