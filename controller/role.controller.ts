import { Request, Response } from "express";
import { Role } from "../models/role";

export class roleController {
    createRole = async (req: Request, res: Response) => {
        const { role_name } = req.body;
        try {
            if (!role_name) {
                res.json({ mesage: "Please enter name" })
            }
            const existingName = await Role.findOne({ where: { role_name } });
            if (existingName) {
                return res.status(201).json({
                    message: "Role is allredy Created."
                })
            }
            const newrole = await Role.create({ role_name });
            if (newrole) {
                return res.json({
                    success: true,
                    message: 'Role Created successfully.',
                    data: newrole
                })
            } else {
                return res.status(404).json({ message: "Error in creating Role" })
            }
        } catch (error) {
            console.log("Error in creating Role", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    updateRole = async (req: Request, res: Response) => {
        const { role_id } = req.params;
        const { body } = req;

        try {
            // Find the user by id in the database
            const updatedrole = await Role.findByPk(role_id);
            if (updatedrole) {
                await updatedrole.update(body);
                return res.status(200).json({
                    success: true,
                    data: updatedrole
                })
            } else {
                return res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            console.error('Error updating Role:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    deleteRole = async (req: Request, res: Response) => {
        const { role_id } = req.params;
        try {
            const role = await Role.findByPk(role_id)
            if (role) {
                await role.destroy();
                return res.status(200).json({
                    success: true,
                    message: 'Role deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Role not found'
                });
            }
        } catch (error) {
            console.error('Error deleting Role:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}