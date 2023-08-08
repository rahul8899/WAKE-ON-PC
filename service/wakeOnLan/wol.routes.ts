import { Router } from "express";
import { wolController } from "./wol.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export class wolRoutes {
    router = Router();
    private wc: wolController = new wolController();
    constructor() {
        // Route to wake 
        this.router.get('/:pc_list_id', authMiddleware, this.wc.wakeup);
    }
}