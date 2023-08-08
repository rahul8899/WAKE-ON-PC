import { Request, Response } from "express";
import * as dotenv from "dotenv";
import wakeOnLan from "wake_on_lan";
import { pcList } from "../../models/pcList";
dotenv.config();

export class wolController {
    wakeup = async (req: Request, res: Response) => {
        // const { MAC } = req.body;
        const { pc_list_id } = req.params;
        try {
            const pc = await pcList.findByPk(pc_list_id)
            const MAC = pc.MAC;
            wakeOnLan.wake(MAC, function (error: any) {
                if (error) {
                    res.send('Failed to send packets...');
                } else {
                    res.send('Success, packets sent, PC should power on...');
                }
            });

        } catch (error) {
            console.log("Error is : ", error);
            res.json({
                message: "error in calling wakeup function."
            })
        }
    }
}