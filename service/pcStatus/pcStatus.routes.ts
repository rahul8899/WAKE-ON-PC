import { Router } from "express";
import { PcStatusController } from "./pcStatus.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export class pcStatusRoutes {
    router = Router();
    private psc: PcStatusController = new PcStatusController();
    constructor() {
        // Route to chek ALL PC status
        this.router.get('/', authMiddleware, this.psc.getPCStatus);

        // route to update PC status in DB.
        this.router.put('/', authMiddleware, this.psc.updatePCStatusINDB);
    };

}