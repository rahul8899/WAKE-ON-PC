import db from "../models/index";
import { DataTypes } from "sequelize";

export const Module = db.sequelize.define('module', {
    module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    module_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'module',
    timestamp: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: 'module_id' }
            ]
        }
    ]
})