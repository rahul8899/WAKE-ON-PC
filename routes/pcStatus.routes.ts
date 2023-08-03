import { Router } from "express";
import pcStatusController from "../controller/pcStatus.controller";

export class pcStatusRoutes {
    router = Router();
    private psc: pcStatusController = new pcStatusController();
    constructor() {
        // Route to wake 
        this.router.get('/isturnon', this.psc.isPCTurnedOn);

        // const checkIntervalInMilliseconds = 10 * 1000; // 1 minute
        // setInterval(async () => {
        //     const ipAddress = '192.168.1.131'; // Replace this with your PC's IP address
        //     const isPCTurnedOn = await pcStatusController.pingIP(ipAddress);
        //     console.log(`PC is turned on: ${isPCTurnedOn}`);
        // }, checkIntervalInMilliseconds);
    }
}