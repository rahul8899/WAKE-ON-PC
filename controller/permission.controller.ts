import { Request, Response } from "express";
import { Permission } from "../models/permission";
import { Module } from "../models/module";

export class permissionController {
    public changePermission = async (req: Request, res: Response) => {
        const { body } = req;
        const { role_id, module_id } = req.body;

        try {
            const permission = await Permission.findOne({
                where: { role_id, module_id }
            })
            if (permission) {
                await permission.update(body);
            } else {
                await Permission.create(body);
            }
            return res.json({
                success: true,
                data: permission
            });
        } catch (error) {
            console.log("Error in permission", error);
            return res.json({ message: "Error in create or update permission." })
        }
    };

    getAllPermission = async (req: Request, res: Response) => {
        const { role_id } = req.params;
        try {
            const permission = await Permission.findAll({
                where: { role_id: role_id }
                // include: Module
                // attributes: ["user_id", "user_name", "email", "role_id"],
                // include: [{
                //     model: Module,
                //     attributes: ["role_name"],
                //     where: { role_id: Sequelize.col("Users.role_id") }
                // }]
            });
            if (permission) {
                // const permissionWithModule = permission.map((permission: any) => {
                //     const { permission_id, permission_read, permission_write, permission_update, permission_delete, module: { module_name } } = permission;
                //     return { permission_id, module_name, permission_read, permission_write, permission_update, permission_delete };
                // })
                res.json({
                    success: true,
                    data: permission,
                })
            } else {
                res.json({
                    succcess: false
                })
            }
        } catch (error) {
            console.log("Error in getting permission", error);
            return res.json({ message: "Error in getting permission." })
        }
    }
}


