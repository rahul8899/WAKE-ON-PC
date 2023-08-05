import express from "express"
import { authRoutes } from "../routes/auth.routes";
import { wolRoutes } from "../routes/wol.routes";
import { pcStatusRoutes } from "../routes/pcStatus.routes";
import { roleRoutes } from "../routes/role.routes";
import { moduleRoutes } from "../routes/module.routes";
import { permissionRoutes } from "../routes/permission.routes";
import { userRoutes } from "../routes/user.routes";
export class Routes {
    route = express.Router();

    path() {
        this.route.use('/auth', new authRoutes().router);
        this.route.use('/wol', new wolRoutes().router);
        this.route.use('/pcstatus', new pcStatusRoutes().router);
        this.route.use('/role', new roleRoutes().router);
        this.route.use('/module', new moduleRoutes().router);
        this.route.use('/permission', new permissionRoutes().router);
        this.route.use('/user', new userRoutes().router);
        return this.route
    }
}