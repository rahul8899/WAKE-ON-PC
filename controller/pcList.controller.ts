import { Request, Response } from "express";
import { pcList } from "../models/pcList";
import { Users } from "../models/users";
import { Sequelize } from "sequelize-typescript";

export class pcListController {
    createPC = async (req: Request, res: Response) => {
        const { user_name, MAC, IP } = req.body;
        try {
            // check is pc is allredy added or not.
            const existingPC = await pcList.findOne({ where: { MAC } });
            if (existingPC) {
                return res.status(409).json({
                    message: "PC is allredy registed."
                })
            };

            // Now get the user_id from user_name
            const user = await Users.findOne({ where: { user_name } });
            if (!user) {
                return res.json({ message: "Invalid user name" });
            };
            const user_id = user.user_id;

            const newPC = await pcList.create({ user_id, MAC, IP });
            return res.json({
                success: true,
                data: newPC
            });
        } catch (error) {
            console.log("Error in creating new PC ", error);
            return res.status(500).json({ message: "Enternal server Error" });
        }
    };

    selectAllPc = async (req: Request, res: Response) => {
        try {
            const pc = await pcList.findAll({
                attributes: ["pc_list_id", "user_id", "MAC", "IP"],
                include: [{
                    model: Users,
                    attributes: ["user_name"],
                    where: { user_id: Sequelize.col("pc_lists.user_id") }
                }]
            });
            if (pc) {
                const pcWithUserName = pc.map((pc: any) => {
                    const { pc_list_id, user_id, MAC, IP, user: { user_name } } = pc;
                    return { pc_list_id, user_id, user_name, MAC, IP };
                });
                return res.json({
                    success: true,
                    data: pcWithUserName
                })
            } else {
                return res.json({ message: "PC not found" });
            }
        } catch (error) {
            console.log("There is error in finding all PC", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    updatePC = async (req: Request, res: Response) => {
        const { pc_list_id } = req.params;
        const { user_name, MAC, IP } = req.body
        try {
            // first find pc.
            const pc = await pcList.findByPk(pc_list_id);
            if (pc) {
                // Now get the user_id from user_name
                const user = await Users.findOne({ where: { user_name } });
                if (!user) {
                    return res.json({ message: "Invalid user name" });
                };
                const user_id = user.user_id;

                await pc.update({ user_id, MAC, IP })
                return res.json({
                    success: true,
                    data: pc
                })
            } else {
                return res.json({
                    success: false,
                    message: "PC not found"
                })
            }
        } catch (error) {
            console.log("There is error in updating PC", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    deletePC = async (req: Request, res: Response) => {
        const { pc_list_id } = req.params;
        try {
            const pc = await pcList.findByPk(pc_list_id);
            if (pc) {
                await pc.destroy();
                return res.json({
                    success: true,
                    message: "Pc deleted."
                })
            } else {
                return res.json({ message: "PC not found" })
            }
        } catch (error) {
            console.log("There is error in deleting PC", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
}