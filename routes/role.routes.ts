import { Router } from "express";
import { roleController } from "../controller/role.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class roleRoutes {
    router = Router();
    private rc: roleController = new roleController();
    constructor() {
        //route to craete role
        this.router.post('/', authMiddleware, this.rc.createRole);

        //route to display all role.
        this.router.get('/', authMiddleware, this.rc.selectAllRole);

        //route to update role
        // here this :role_id have to delecare as PARAM in the update controller
        this.router.put('/:role_id', authMiddleware, this.rc.updateRole);

        // route to delete role.
        // here this :role_id have to declare as PARAM in the delete controller
        // And also we have to give that id in the parameater in POSTMAN for testing API.
        this.router.delete('/:role_id', authMiddleware, this.rc.deleteRole);
    }
}