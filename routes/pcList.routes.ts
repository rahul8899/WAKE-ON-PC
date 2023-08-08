import { Router } from "express";
import { pcListController } from "../controller/pcList.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class pcListRoutes {
    router = Router();
    private plc: pcListController = new pcListController();
    constructor() {
        // route to add pc 
        this.router.post('/', authMiddleware, this.plc.createPC);

        // route to display all pc
        this.router.get('/', authMiddleware, this.plc.selectAllPc);

        // route to update pc
        this.router.put('/:pc_list_id', authMiddleware, this.plc.updatePC);

        // route to delete pc
        this.router.delete('/:pc_list_id', authMiddleware, this.plc.deletePC);

        // route to count total pc
        this.router.get('/count-all', authMiddleware, this.plc.countPCs);

        // route to count turned on  pc
        this.router.get('/turn-on', authMiddleware, this.plc.ccountTurnedOnPCs);

        // route to count turned off  pc
        this.router.get('/turn-off', authMiddleware, this.plc.ccountTurnedOffPCs);
    }
}