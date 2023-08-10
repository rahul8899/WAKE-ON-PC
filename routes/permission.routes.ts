import { Router } from "express";
import { permissionController } from "../controller/permission.controller";
import { bodyValidate } from "../middleware/validate.schema.middleware";
import { permissionSchema } from "../schema.validate/permission.schema";
import { authMiddleware } from "../middleware/auth.middleware";

export class permissionRoutes {
    router = Router();
    private pc: permissionController = new permissionController();
    constructor() {
        // routes to create or update permission.
        this.router.post('/', authMiddleware, bodyValidate(permissionSchema), this.pc.changePermission);

        // route to display permission
        this.router.get('/:role_id', authMiddleware, this.pc.getAllPermission);
    }
}