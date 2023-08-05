import { Router } from "express";
import { permissionController } from "../controller/permission.controller";
import { bodyValidate } from "../middleware/validate.schema.middleware";
import { permissionSchema } from "../schema.validate/permission.schema";

export class permissionRoutes {
    router = Router();
    private pc: permissionController = new permissionController();
    constructor() {
        this.router.post('/createDelete', bodyValidate(permissionSchema), this.pc.changePermission);
    }
}