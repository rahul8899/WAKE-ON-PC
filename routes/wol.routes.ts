import { Router } from "express";
import { wolController } from "../controller/wol.controller";

export class wolRoutes {
    router = Router();
    private ac: wolController = new wolController();
    constructor() {
        // Route to wake 
        this.router.get('/wake', this.ac.wakeup);
    }
}