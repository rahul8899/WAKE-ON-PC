import { Request, Response } from "express";
import wakeOnLan from "wake_on_lan";
import { pcList } from "../../models/pcList";
import { PcStatusController } from "../pcStatus/pcStatus.controller";

export class wolController {
    private psc: PcStatusController = new PcStatusController();

    wakeup = async (req: Request, res: Response) => {
        const { pc_list_id } = req.params;
        try {
            const pc = await pcList.findByPk(pc_list_id);
            if (!pc) {
                return res.status(404).json({
                    message: "PC not found."
                });
            };
            const IP = pc.IP;
            const result = await this.psc.pingIP(IP);
            if (result) {
                return res.json({ message: "PC is allredy turn on." })
            }
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