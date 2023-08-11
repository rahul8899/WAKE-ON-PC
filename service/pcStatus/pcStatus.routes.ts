import { Router } from "express";
import { PcStatusController } from "./pcStatus.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export class pcStatusRoutes {
    router = Router();
    private psc: PcStatusController = new PcStatusController();
    constructor() {
        // Route to chek ALL PC status
        this.router.get('/', authMiddleware, this.psc.getPCStatusOfAllPC);

        // route to update PC status in DB.
        this.router.put('/', authMiddleware, this.psc.updatePCStatusINDB);

        // route to get pc status after wake on action
        this.router.get('/:pc_list_id', authMiddleware, this.psc.pcStatusAfterWakeON);
    };

}