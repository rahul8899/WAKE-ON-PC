import { Request, Response } from 'express';
import ping from 'ping';

class pcStatusController {
    isPCTurnedOn = async (req: Request, res: Response) => {
        const { ipAddress } = req.body;
        try {
            if (!ipAddress) {
                return res.status(400).json({ error: 'ipAddress is required in the request body' });
            }
            const result = await pcStatusController.pingIP(ipAddress);
            res.json({ isPCTurnedOn: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static pingIP = async (ipAddress: string): Promise<boolean> => {
        try {
            const res = await ping.promise.probe(ipAddress, { timeout: 2 });
            return res.alive;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}

export default pcStatusController;
