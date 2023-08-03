import { Router } from "express";
import { wolController } from "../controller/wol.controller";

export class wolRoutes {
    router = Router();
    private wc: wolController = new wolController();
    constructor() {
        // Route to wake 
        this.router.get('/wake', this.wc.wakeup);
    }
}