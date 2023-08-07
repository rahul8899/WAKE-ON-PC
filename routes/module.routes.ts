import { Router } from "express";
import { moduleController } from "../controller/module.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class moduleRoutes {
    router = Router();
    private mc: moduleController = new moduleController();
    constructor() {
        // route to create module
        this.router.post('/', authMiddleware, this.mc.createModule);

        // route to display all module
        this.router.get('/', authMiddleware, this.mc.selectAllModule);

        // route to update module
        this.router.put('/:module_id', authMiddleware, this.mc.updateModule);

        // route to delete module
        this.router.delete('/:module_id', authMiddleware, this.mc.deleteModule);
    }
}