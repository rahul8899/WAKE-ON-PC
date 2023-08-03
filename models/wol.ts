import db from "./index";
import { DataTypes } from "sequelize";

export const Wol = db.sequelize.define('wol', {
    wol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    MAC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tablename: 'wol',
    timestamp: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: 'wol_id' }
            ]
        }
    ]
});