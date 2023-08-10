import { Request, Response } from "express";
import * as dotenv from "dotenv";
import wakeOnLan from "wake_on_lan";
import { pcList } from "../../models/pcList";
dotenv.config();

export class wolController {
    wakeup = async (req: Request, res: Response) => {
        const { pc_list_id } = req.params;
        try {
            const pc = await pcList.findByPk(pc_list_id);
            if (!pc) {
                return res.status(404).json({
                    message: "PC not found."
                });
            };
            const MAC = pc.MAC;
            wakeOnLan.wake(MAC, function (error: any) {
                if (error) {
                    res.send({
                        success: false,
                        message: 'Failed to send packets...'
                    });
                } else {
                    res.send({
                        success: true,
                        message: "packets sent, PC should power on...",
                        pc_list_id: pc.pc_list_id,
                        MAC: pc.MAC
                    });
                }
            });

        } catch (error) {
            console.log("Error is : ", error);
            res.json({ message: "error in calling wakeup function." })
        }
    }
}