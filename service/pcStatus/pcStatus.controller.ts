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

            const result = await this.pingIP(ipAddress);
            res.json({ isPCTurnedOn: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    pingIP = async (ipAddress: string): Promise<boolean> => {
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
            const results = [];

            for (const item of pcListItems) {
                const IP = item.IP;
                const result = await this.pingIP(IP);
                // console.log(`Is PC with IP ${ipAddress} is turned On ? : ${result} `, result);
                // console.log(`Is PC with IP ${IP} is turned On ? : `, result);
                results.push({ IP, isTurnedOn: result });
            }
            return results;
        } catch (error) {
            console.error("Error in cron job:", error);
            return [];
        }
    };
    getPCStatus = async (req: Request, res: Response) => {
        try {
            const results = await this.checkPCStatusForAll();
            res.json(results);
        } catch (error) {
            console.error("Error in getting PC status:", error);
            res.json({ error: "Internal server error" });
        }
    };
}
