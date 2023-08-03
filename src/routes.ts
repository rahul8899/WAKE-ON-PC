import express from "express"
import { authRoutes } from "../routes/auth.routes";
import { wolRoutes } from "../routes/wol.routes";
import { pcStatusRoutes } from "../routes/pcStatus.routes";
import { roleRoutes } from "../routes/role.routes";
export class Routes {
    route = express.Router();

    path() {
        this.route.use('/auth', new authRoutes().router);
        this.route.use('/wol', new wolRoutes().router);
        this.route.use('/pcstatus', new pcStatusRoutes().router);
        this.route.use('/role', new roleRoutes().router);
        return this.route
    }
}