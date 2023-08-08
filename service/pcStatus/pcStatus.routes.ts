import { Router } from "express";
import { PcStatusController } from "./pcStatus.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export class pcStatusRoutes {
    router = Router();
    private psc: PcStatusController = new PcStatusController();
    constructor() {
        // Route to wake
        this.router.get('/', authMiddleware, this.psc.getPCStatus);
    };

}