import { Request, Response } from "express";
import { Permission } from "../models/permission";

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
    }
}


