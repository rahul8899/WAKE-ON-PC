// controllers/pcStatusController.ts
import { Request, Response } from "express";
import ping from "ping";
import { pcList } from "../../models/pcList";

export class PcStatusController {
    isPCTurnedOn = async (req: Request, res: Response) => {
        try {
            const { ipAddress } = req.body;
            if (!ipAddress) {
                return res.status(400).json({ error: "ipAddress is required in the request body" });
            }

            const result = await PcStatusController.pingIP(ipAddress);
            res.json({ isPCTurnedOn: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    static pingIP = async (ipAddress: string): Promise<boolean> => {
        try {
            const res = await ping.promise.probe(ipAddress);
            return res.alive;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    checkPCStatusForAll = async () => {
        try {
            const pcListItems = await pcList.findAll();
            for (const item of pcListItems) {
                const ipAddress = item.IP;
                const result = await PcStatusController.pingIP(ipAddress);
                console.log(`Is PC with IP ${ipAddress} is turned On ? : ${result} `);
            }
        } catch (error) {
            console.error("Error in cron job:", error);
        }
    };
}
