import { Request, Response } from "express";
import ping from "ping";
import { pcList } from "../../models/pcList";

export class PcStatusController {

    updatePCStatusINDB = async () => {
        try {
            const allPC = await pcList.findAll();
            if (!allPC) {
                console.log("PC not found");
            };
            for (const item of allPC) {
                const IP = item.IP;
                let status = item.status;
                const result = await this.pingIP(IP);
                // console.log(`Is PC with IP ${IP} is turned On ? : `, result);
                status = result;
                await item.update({ status });
            }
            console.log("pc status updated in database.");
        } catch (error) {
            console.log("Error in updating PC status in DB", error);
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
