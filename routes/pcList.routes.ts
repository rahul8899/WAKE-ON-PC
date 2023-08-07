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
    }
}