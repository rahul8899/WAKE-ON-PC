import { allow } from "joi";
import db from "./index";
import { DataTypes } from "sequelize";
import { Role } from "./role";

export const Users = db.sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tablename: 'users',
    timestamp: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: 'user_id' }
            ]
        }
    ]
});

Users.belongsTo(Role, { foreignKey: 'role_id' });