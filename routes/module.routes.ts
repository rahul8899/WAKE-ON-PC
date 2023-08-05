import { Router } from "express";
import { moduleController } from "../controller/module.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class moduleRoutes {
    router = Router();
    private mc: moduleController = new moduleController();
    constructor() {
        this.router.post('/', authMiddleware, this.mc.createModule);
        this.router.get('/', authMiddleware, this.mc.selectAllModule);
        this.router.put('/:module_id', authMiddleware, this.mc.updateModule);
        this.router.delete('/:module_id', authMiddleware, this.mc.deleteModule);
    }
}