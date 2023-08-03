import { Router } from "express";
import { roleController } from "../controller/role.controller";

export class roleRoutes {
    router = Router();
    private rc: roleController = new roleController();
    constructor() {
        this.router.post('/createrole', this.rc.createRole);
        this.router.put('/updaterole/:role_id', this.rc.updateRole);
        // here this :role_id have to delecare as PARAM in the update controller
        this.router.delete('/deleterole/:role_id', this.rc.deleteRole);

    }
}