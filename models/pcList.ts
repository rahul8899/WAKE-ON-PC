import { DataTypes } from "sequelize";
import db from "./index";
import { Users } from "../models/users";

export const pcList = db.sequelize.define('pc_lists', {
    pc_list_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MAC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IP: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'pc_lists',
    timestamp: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: 'pc_list_id' }
            ]
        }
    ]
});

pcList.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'user_id' });
