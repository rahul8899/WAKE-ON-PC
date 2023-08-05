import db from "../models/index";
import { DataTypes } from "sequelize";
import { Role } from "./role";
import { Module } from "../models/module";

export const Permission = db.sequelize.define('permission', {
    permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    permission_read: {
        type: DataTypes.INTEGER
    },
    permission_write: {
        type: DataTypes.INTEGER
    },
    permission_update: {
        type: DataTypes.INTEGER
    },
    permission_delete: {
        type: DataTypes.INTEGER
    }
});

Permission.belongsTo(Role, { foreignKey: 'role_id' });
Permission.belongsTo(Module, { foreignKey: 'module_id' });