import db from "../models/index";
import { DataTypes } from "sequelize";

export const Role = db.sequelize.define('role', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'role',
    timestamp: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: 'role_id' }
            ]
        }
    ]
})