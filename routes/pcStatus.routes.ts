import { Router } from "express";
import pcStatusController from "../controller/pcStatus.controller";
import { authMiddleware } from "../middleware/auth.middleware";
export class pcStatusRoutes {
    router = Router();
    private psc: pcStatusController = new pcStatusController();
    constructor() {
        // Route to wake on PC 
        this.router.get('/isturnon', authMiddleware, this.psc.isPCTurnedOn);

        // const checkIntervalInMilliseconds = 10 * 1000; // 1 minute
        // setInterval(async () => {
        //     const ipAddress = '192.168.1.131'; // Replace this with your PC's IP address
        //     const isPCTurnedOn = await pcStatusController.pingIP(ipAddress);
        //     console.log(`PC is turned on: ${isPCTurnedOn}`);
        // }, checkIntervalInMilliseconds);
    }
}